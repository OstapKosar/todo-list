import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChangeNameBodyDto } from './dto/change-name.body-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async changeName(dto: ChangeNameBodyDto) {
    const { userId, name } = dto;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { name },
    });

    return { message: 'Name changed successfully' };
  }
}
