import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Context } from 'src/common/decorators/context.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { IdDto } from 'src/common/dto/id.dto';

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

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Get(':id')
  getProject(@Param() id: IdDto) {
    return this.projectsService.getProject(id);
  }

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Post()
  createProject(@Body() dto: CreateProjectDto, @Context('uid') uid: string) {
    return this.projectsService.createProject(dto, uid);
  }

  @UseGuards(JwtGuard('access'))
  @ApiBearerAuth()
  @Delete(':id')
  deleteProject(@Param() id: IdDto) {
    return this.projectsService.deleteProject(id);
  }
}
