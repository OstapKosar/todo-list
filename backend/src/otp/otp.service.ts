import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { Cron, CronExpression } from '@nestjs/schedule';

import { User, UserOTPType, UserOTPStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { verifyEmailTemplate } from 'src/mail/templates/verify-email.template';
import {
  fifteenMinutesInMilliseconds,
  fiveMinutesInMilliseconds,
} from 'src/common/constants/time.constants';
import { resetPasswordTemplate } from 'src/mail/templates/reset-password.template';

@Injectable()
export class OTPService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async generateOtp(user: User, type: UserOTPType): Promise<string> {
    const otp = randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await this.prisma.userOTP.create({
      data: {
        userId: user.id,
        type,
        code: hashedOtp,
        status: UserOTPStatus.ACTIVE,
      },
    });

    return otp;
  }

  async emailVerificationOrResetPassword(user: User, type: UserOTPType) {
    const otp = await this.generateOtp(user, type);

    if (type === UserOTPType.VERIFICATION) {
      const emailDto = verifyEmailTemplate(user.email, otp, user.name);
      await this.mailService.sendEmail(emailDto);
      return otp;
    }

    if (type === UserOTPType.RESET_PASSWORD) {
      const emailDto = resetPasswordTemplate(user.email, otp, user.name);
      await this.mailService.sendEmail(emailDto);
      return otp;
    }

    throw new BadRequestException('Invalid OTP type');
  }

  async validateVerificationOtp(email: string, code: string) {
    return this.validateOtpByType(email, code, UserOTPType.VERIFICATION);
  }

  async validateForgotPasswordOtp(email: string, code: string) {
    return this.validateOtpByType(email, code, UserOTPType.RESET_PASSWORD);
  }

  private async validateOtpByType(
    email: string,
    code: string,
    type: UserOTPType,
  ) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email provided');
    }

    const otpCodes = await this.prisma.userOTP.findMany({
      where: {
        userId: user.id,
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpCodes.length) {
      throw new BadRequestException(
        'No verification code found, please request a new one',
      );
    }

    for (const otpCode of otpCodes) {
      if (otpCode.status === UserOTPStatus.ACTIVE) {
        const isMatch = await bcrypt.compare(code, otpCode.code);
        if (isMatch) {
          await this.prisma.userOTP.update({
            where: { id: otpCode.id },
            data: { status: UserOTPStatus.ARCHIVED },
          });
          return true;
        }
      }
    }

    const expiredOtp = otpCodes.find(
      (otp) =>
        otp.status === UserOTPStatus.EXPIRED &&
        bcrypt.compareSync(code, otp.code),
    );

    if (expiredOtp) {
      throw new BadRequestException(
        'Verification code is expired, please request a new one',
      );
    }

    // Check if the code matches an already used OTP
    const usedOtp = otpCodes.find(
      (otp) =>
        otp.status === UserOTPStatus.ARCHIVED &&
        bcrypt.compareSync(code, otp.code),
    );

    if (usedOtp) {
      throw new BadRequestException(
        'Verification code has already been used, please request a new one',
      );
    }

    throw new BadRequestException('Invalid verification code');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiration() {
    const now = Date.now();
    const typesWithDuration = [
      { type: UserOTPType.VERIFICATION, duration: fiveMinutesInMilliseconds },
      {
        type: UserOTPType.RESET_PASSWORD,
        duration: fifteenMinutesInMilliseconds,
      },
    ];

    for (const { type, duration } of typesWithDuration) {
      const expirationTime = new Date(now - duration);

      await this.prisma.userOTP.updateMany({
        where: {
          status: UserOTPStatus.ACTIVE,
          type,
          createdAt: { lt: expirationTime },
        },
        data: {
          status: UserOTPStatus.EXPIRED,
        },
      });
    }
  }
}
