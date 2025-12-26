import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';
import { IdDto } from 'src/common/dto/id.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async getTask(dto: IdDto) {
    const { id } = dto;

    const task = await this.prisma.projectTask.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async createTask(dto: CreateProjectTaskDto) {
    const { projectId } = dto;

    const existingTask = await this.prisma.projectTask.findFirst({
      where: {
        projectId,
        title: dto.title,
      },
    });

    if (existingTask) {
      throw new BadRequestException('Task with this title already exists');
    }

    return await this.prisma.projectTask.create({
      data: { ...dto, projectId },
    });
  }

  async updateTask(dto: UpdateProjectTaskDto, idDto: IdDto) {
    const { id } = idDto;

    return await this.prisma.projectTask.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteTask(dto: IdDto) {
    const { id } = dto;

    const task = await this.prisma.projectTask.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.prisma.projectTask.delete({ where: { id } });
  }
}
