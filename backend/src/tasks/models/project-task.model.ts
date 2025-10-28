import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
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
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  urgency: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  importance: number;

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
