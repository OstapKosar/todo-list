import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
