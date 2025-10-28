import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsEmail,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProjectModel } from 'src/projects/models/project.model';
import { IdDto } from 'src/common/dto/id.dto';
import { DatabaseDateFieldsDto } from 'src/common/dto/database-date-fields.dto';

export class UserModel extends IntersectionType(IdDto, DatabaseDateFieldsDto) {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ValidateNested({ each: true })
  @Type(() => ProjectModel)
  @ApiProperty({ type: [ProjectModel] })
  projects: ProjectModel[];
}
