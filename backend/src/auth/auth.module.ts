import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthJwtService } from 'src/jwt/jwt.service';
import { OTPModule } from 'src/otp/otp.module';
import { MailModule } from 'src/mail/mail.module';

@Global()
@Module({
  imports: [UsersModule, PassportModule, OTPModule, MailModule],
  providers: [AuthService, AuthJwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService, AuthJwtService],
  controllers: [AuthController],
})
export class AuthModule {}
