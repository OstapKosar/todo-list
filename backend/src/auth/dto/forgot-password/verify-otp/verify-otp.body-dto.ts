import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyForgotPasswordOtpBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, {
    message: 'Verification code must be exactly 6 characters long',
  })
  code: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
