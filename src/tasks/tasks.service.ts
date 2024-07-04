import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasks(id: number) {
    try {
      const tasks = await this.prisma.tasks.findMany({
        where: {
          userId: id,
        },
      });
      return tasks;
    } catch (error) {
      if (error instanceof Error)
        return new HttpException(
          `Internal Server Error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async createTask(task: CreateTaskDto, userId: number) {
    try {
      const newTask = await this.prisma.tasks.create({
        data: {
          title: task.title,
          description: task.description,
          userId: userId,
        },
      });
      return newTask;
    } catch (error) {
      if (error instanceof Error)
        return new HttpException(
          `Internal Server Error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async updateTask(task: UpdateTaskDto, id: number) {
    try {
      const updateTask = await this.prisma.tasks.update({
        where: {
          id,
        },
        data: {
          title: task.title,
          description: task.description,
          status: task.status,
        },
      });
      return updateTask;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        return new HttpException(
          `The task with id ${id} is not found`,
          HttpStatus.NOT_FOUND,
        );
      if (error instanceof Error)
        return new HttpException(
          `Internal Server Error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async deleteTask(id: number) {
    try {
      const deletedTask = await this.prisma.tasks.delete({
        where: {
          id,
        },
      });
      return deletedTask;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        return new NotFoundException(`Task with id ${id} is not found`);
      if (error instanceof Error)
        return new HttpException(
          `Internal Server Error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findTask(id: number) {
    try {
      const task = await this.prisma.tasks.findFirst({
        where: { id },
      });
      if (task) return task;
      return new NotFoundException(`Task with id ${id} is not found`);
    } catch (error) {
      if (error instanceof Error)
        return new HttpException(
          `Internal Server Error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
