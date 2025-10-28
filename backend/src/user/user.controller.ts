import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { ChangeNameBodyDto } from './dto/change-name.body-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('change-name')
  @ApiResponse({ status: 200, description: 'Name changed successfully' })
  @ApiBody({ type: ChangeNameBodyDto })
  async changeName(@Body() dto: ChangeNameBodyDto) {
    return this.userService.changeName(dto);
  }
}
