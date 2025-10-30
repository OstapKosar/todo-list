import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { IdDto } from 'src/common/dto/id.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async getProject(dto: IdDto) {
    const { id } = dto;

    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async createProject(dto: CreateProjectDto, userId: string) {
    const existingProject = await this.prisma.project.findFirst({
      where: {
        ownerId: userId,
        name: dto.name,
      },
    });

    if (existingProject) {
      throw new BadRequestException(
        'You already have a project with this name',
      );
    }

    const project = await this.prisma.project.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });

    return project;
  }

  async deleteProject(dto: IdDto) {
    const { id } = dto;

    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.prisma.project.delete({ where: { id } });

    return { message: 'Project deleted successfully' };
  }
}
