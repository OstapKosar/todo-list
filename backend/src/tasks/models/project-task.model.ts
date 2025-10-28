import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  urgency: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  importance: boolean;

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
