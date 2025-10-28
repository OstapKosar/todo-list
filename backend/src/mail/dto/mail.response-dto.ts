import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class MailResponseDto {
  @ApiProperty()
  @IsArray()
  @IsEmail({}, { each: true })
  @IsNotEmpty()
  recipients: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  html: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  attachments?: any[];
}
