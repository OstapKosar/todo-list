import { PickType } from '@nestjs/swagger';
import { ProjectTaskModel } from '../models/project-task.model';

export class CreateProjectTaskDto extends PickType(ProjectTaskModel, [
  'title',
  'description',
  'urgency',
  'importance',
]) {}
