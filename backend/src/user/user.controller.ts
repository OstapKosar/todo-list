import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserInfoBodyDto } from './dto/update-user-info.body-dto';
import { Context } from 'src/common/decorators/context.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update-user-info')
  @ApiResponse({ status: 200, description: 'User info updated successfully' })
  @UseGuards(JwtGuard('access'))
  async updateUserInfo(
    @Body() dto: UpdateUserInfoBodyDto,
    @Context('uid') userId: string,
  ) {
    return await this.userService.updateUserInfo(dto, userId);
  }
}
