import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getTasks(@Request() req){
    return this.tasksServices.getTasks(req.user.id)
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksServices.findTask(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Body() data: CreateTaskDto, @Request() req){
    return this.tasksServices.createTask(data, req.user.id)
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updatetask(@Body() data: UpdateTaskDto, @Param('id', ParseIntPipe)  id: number){
    return this.tasksServices.updateTask(data, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksServices.deleteTask(id);
  }
}
