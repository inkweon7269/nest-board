import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.taskRepo.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepo.save(task);

    return task;
  }

  async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
    // const found = await this.taskRepo.findOne(id, { where: { user } });
    const found = await this.taskRepo.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Task with id ${id}`);
    }

    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Task with id ${id}`);
    }

    console.log('result', result);
  }

  /*async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepo.save(task);

    return task;
  }*/
}
