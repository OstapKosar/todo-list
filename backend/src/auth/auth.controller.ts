import { Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() dto: SignupDto): Promise<User> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto): Promise<{
    message: string;
    userInfo: { id: string; name: string; email: string };
  }> {
    return this.authService.login(dto);
  }
}
