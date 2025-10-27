import { Module } from '@nestjs/common';
import { OTPService } from './otp.service';
import { PrismaModule } from 'src/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PrismaModule, UsersModule, MailModule],
  providers: [OTPService],
  exports: [OTPService],
})
export class OTPModule {}
