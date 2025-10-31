import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Post()
  createProjectTask(@Body() dto: CreateProjectTaskDto) {
    return this.tasksService.createProjectTask(dto);
  }
}
