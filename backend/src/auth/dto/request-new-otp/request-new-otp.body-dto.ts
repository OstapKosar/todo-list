import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserOTPType } from '@prisma/client';

export class RequestNewOtpBodyDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsEnum(UserOTPType)
  @IsNotEmpty()
  type: UserOTPType;
}
