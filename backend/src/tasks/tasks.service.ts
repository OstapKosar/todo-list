import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectTaskDto } from './dto/create-project-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.projectTask.findMany({
      include: {
        project: true,
      },
    });
  }

  async createProjectTask(dto: CreateProjectTaskDto) {
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
}
