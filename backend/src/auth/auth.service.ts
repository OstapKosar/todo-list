import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async signup(dto: SignupDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password, // await bcrypt.hash(dto.password, 10) after adding bcrypt
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    } else if (user.password !== dto.password) {
      // await bcrypt.compare(dto.password, user.password) after adding bcrypt
      throw new UnauthorizedException('Invalid password');
    }

    return {
      message: 'Login successful',
      userInfo: { id: user.id, name: user.name, email: user.email },
    };
  }
}
