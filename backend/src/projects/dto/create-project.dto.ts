import { PickType } from '@nestjs/swagger';
import { ProjectModel } from '../models/project.model';

export class CreateProjectDto extends PickType(ProjectModel, [
  'name',
  'description',
]) {}
