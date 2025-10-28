import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
