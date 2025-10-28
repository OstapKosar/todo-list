import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { OTPModule } from './otp/otp.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    PrismaModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
    MailModule,
    OTPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
