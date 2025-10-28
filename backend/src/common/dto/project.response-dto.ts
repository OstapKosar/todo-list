import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ProjectModel } from 'src/projects/models/project.model';
import { TaskResponseDto } from './task.response-dto';

export class ProjectResponseDto extends PickType(ProjectModel, [
  'id',
  'name',
  'description',
]) {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskResponseDto)
  @IsNotEmpty()
  tasks: TaskResponseDto[];
}
