import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Context } from 'src/common/decorators/context.decorator';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Get()
  getAll(@Context('uid') uid: string) {
    return this.projectsService.getAll(uid);
  }
}
