import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  ValidateNested,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';

import { ProjectTaskModel } from 'src/tasks/models/project-task.model';
import { UserModel } from 'src/user/models/user.model';
import { IdDto } from 'src/common/dto/id.dto';
import { DatabaseDateFieldsDto } from 'src/common/dto/database-date-fields.dto';

export class ProjectModel extends IntersectionType(
  IdDto,
  DatabaseDateFieldsDto,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ValidateNested()
  @Type(() => UserModel)
  @ApiProperty({ type: UserModel })
  owner: UserModel;

  @ValidateNested({ each: true })
  @Type(() => ProjectTaskModel)
  @ApiProperty({ type: [ProjectTaskModel] })
  tasks: ProjectTaskModel[];
}
