import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, UsersModule, TasksModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
