import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
