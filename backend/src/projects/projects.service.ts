import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
