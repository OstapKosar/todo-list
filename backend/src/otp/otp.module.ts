import { Module } from '@nestjs/common';
import { OTPService } from './otp.service';
import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PrismaModule, UserModule, MailModule],
  providers: [OTPService],
  exports: [OTPService],
})
export class OTPModule {}
