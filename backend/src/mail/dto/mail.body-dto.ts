import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';

export class MailBodyDto {
  @ApiProperty()
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

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  attachments?: any[];
}
