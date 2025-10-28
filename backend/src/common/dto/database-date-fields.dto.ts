import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DatabaseDateFieldsDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
