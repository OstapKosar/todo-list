import { PickType } from '@nestjs/swagger';
import { ProjectTaskModel } from '../models/project-task.model';

export class UpdateProjectTaskDto extends PickType(ProjectTaskModel, [
  'title',
  'description',
  'urgent',
  'important',
]) {}
