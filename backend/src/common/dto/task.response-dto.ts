import { PickType } from '@nestjs/swagger';
import { ProjectTaskModel } from 'src/tasks/models/project-task.model';

export class TaskResponseDto extends PickType(ProjectTaskModel, [
  'id',
  'title',
  'description',
  'urgency',
  'importance',
  'isCompleted',
]) {}
