import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

import { User, UserOTPType, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SignUpBodyDto } from './dto/sign-up/sign-up.body-dto';
import { LoginBodyDto } from './dto/login/login.body-dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtService } from 'src/jwt/jwt.service';
import { OTPService } from 'src/otp/otp.service';
import { MailService } from 'src/mail/mail.service';
import { VerificationBodyDto } from './dto/verification/verification.body-dto';
import { RequestNewOtpBodyDto } from './dto/request-new-otp/request-new-otp.body-dto';
import { JwtTokenType } from './types/jwt.types';
import { jwtTokenOptionsByType } from './constants/jwt.constants';
import { SendForgotPasswordOtpBodyDto } from './dto/forgot-password/send-otp/send-otp.body-dto';
import { VerifyForgotPasswordOtpBodyDto } from './dto/forgot-password/verify-otp/verify-otp.body-dto';
import { ResetPasswordBodyDto } from './dto/forgot-password/reset-password/reset-password.body-dto';
import { ChangePasswordBodyDto } from './dto/change-password/change-password.body-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: AuthJwtService,
    private readonly otpService: OTPService,
    private readonly mailService: MailService,
  ) {}

  async createRefreshToken(user: User) {
    return await this.jwtService.createToken(user, 'refresh');
  }

  async createAccessToken(user: User) {
    return await this.jwtService.createToken(user, 'access');
  }

  async createForgotPasswordToken(user: User) {
    return await this.jwtService.createToken(user, 'forgotPassword');
  }

  async createTokenPair(user: User) {
    return await this.jwtService.createTokenPair(user);
  }

  setTokenCookie(res: Response, token: string, type: JwtTokenType) {
    const tokenConfig = jwtTokenOptionsByType[type];

    res.cookie(tokenConfig.cookieKey, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: tokenConfig.maxAge,
    });
  }

  clearTokenCookie(res: Response, type: JwtTokenType) {
    const tokenConfig = jwtTokenOptionsByType[type];

    res.clearCookie(tokenConfig.cookieKey);
  }

  async signup(dto: SignUpBodyDto, res: Response) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = await this.createTokenPair(newUser);

    this.setTokenCookie(res, accessToken, 'access');
    this.setTokenCookie(res, refreshToken, 'refresh');

    await this.otpService.emailVerificationOrResetPassword(
      newUser,
      UserOTPType.VERIFICATION,
    );

    return {
      message:
        'User created successfully. Please check your email for verification.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        status: newUser.status,
      },
    };
  }

  async validateUser(dto: { email: string; password: string }) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async login(dto: LoginBodyDto, res: Response) {
    const { email, password } = dto;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid password');
      }

      const updatedUser = await this.syncUserStatus(user);

      const { accessToken, refreshToken } = await this.createTokenPair(user);
      this.setTokenCookie(res, accessToken, 'access');
      this.setTokenCookie(res, refreshToken, 'refresh');

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          status: updatedUser.status,
        },
      };
    } catch (err) {
      if (
        err instanceof UnauthorizedException ||
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }
      throw new BadRequestException('Login failed');
    }
  }

  async sendForgotPasswordOtp(
    dto: SendForgotPasswordOtpBodyDto,
    res: Response,
  ) {
    const { email } = dto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.emailVerificationOrResetPassword(
      user,
      UserOTPType.RESET_PASSWORD,
    );

    const token = await this.createForgotPasswordToken(user);
    this.setTokenCookie(res, token, 'forgotPassword');

    return {
      message: 'Password reset code has been sent to your email!',
    };
  }

  async verifyForgotPassword(
    dto: VerifyForgotPasswordOtpBodyDto,
    res: Response,
  ) {
    const { code, email } = dto;

    await this.otpService.validateForgotPasswordOtp(email, code);

    this.clearTokenCookie(res, 'forgotPassword');

    return {
      message: 'OTP verified successfully',
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      return await this.jwtService.refreshAccessToken(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyCode(body: VerificationBodyDto) {
    const { email, code } = body;
    await this.otpService.validateVerificationOtp(email, code);

    const user = await this.prisma.user.update({
      where: { email },
      data: { status: UserStatus.VERIFIED },
    });

    return {
      message: 'Email verified successfully!',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.status,
      },
    };
  }

  async requestNewOtp(dto: RequestNewOtpBodyDto) {
    const { email, type } = dto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.emailVerificationOrResetPassword(user, type);

    const updatedUser = await this.syncUserStatus(user);

    return {
      message: 'New OTP sent successfully!',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        status: updatedUser.status,
      },
    };
  }

  async resetPassword(dto: ResetPasswordBodyDto) {
    const { password, email } = dto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return {
      message: 'Password reset successfully',
    };
  }

  async changePassword(dto: ChangePasswordBodyDto, userId: string) {
    const { currentPassword, newPassword } = dto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid current password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }

  private async syncUserStatus(user: { id: string; status: UserStatus }) {
    if (user.status === UserStatus.PENDING) {
      const hasActiveOtp = await this.otpService.checkHasActiveVerificationOtp(
        user.id,
      );
      if (!hasActiveOtp) {
        return await this.prisma.user.update({
          where: { id: user.id },
          data: { status: UserStatus.UNVERIFIED },
        });
      }
    }

    if (user.status === UserStatus.UNVERIFIED) {
      const hasActiveOtp = await this.otpService.checkHasActiveVerificationOtp(
        user.id,
      );
      if (hasActiveOtp) {
        return await this.prisma.user.update({
          where: { id: user.id },
          data: { status: UserStatus.PENDING },
        });
      }
    }

    return user;
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.syncUserStatus(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      status: updatedUser.status,
    };
  }
}
