import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { IdDto } from 'src/common/dto/id.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Get(':id')
  getTask(@Param() id: IdDto) {
    return this.tasksService.getTask(id);
  }

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Post()
  createTask(@Body() dto: CreateProjectTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Patch(':id')
  updateTask(@Param() id: IdDto, @Body() dto: UpdateProjectTaskDto) {
    return this.tasksService.updateTask(dto, id);
  }

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Delete(':id')
  deleteTask(@Param() id: IdDto) {
    return this.tasksService.deleteTask(id);
  }
}
