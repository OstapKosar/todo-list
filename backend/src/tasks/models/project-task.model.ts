import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProjectTaskStatus } from '@prisma/client';

import { ProjectModel } from 'src/projects/models/project.model';
import { IdDto } from 'src/common/dto/id.dto';
import { DatabaseDateFieldsDto } from 'src/common/dto/database-date-fields.dto';

export class ProjectTaskModel extends IntersectionType(
  IdDto,
  DatabaseDateFieldsDto,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  urgent: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  important: boolean;

  @ApiProperty({ enum: ProjectTaskStatus })
  @IsNotEmpty()
  isCompleted: ProjectTaskStatus;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ValidateNested()
  @Type(() => ProjectModel)
  @ApiProperty({ type: ProjectModel })
  project: ProjectModel;
}
