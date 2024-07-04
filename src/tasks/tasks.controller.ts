import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags("Tasks")
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get all tasks from user'})
  @ApiResponse({status: 200, description: 'return all tasks'})
  @ApiResponse({status: 500, description: "Internal server error"})
  getTasks(@Request() req){
    return this.tasksServices.getTasks(req.user.id)
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get a task using the id param'})
  @ApiResponse({status: 200, description: 'return the task'})
  @ApiResponse({status: 500, description: "Internal server error"})
  @ApiResponse({status: 404, description: "Not Found"})
  getTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksServices.findTask(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Create a task for a user'})
  @ApiResponse({status: 200, description: 'return the created task'})
  @ApiResponse({status: 500, description: "Internal server error"})
  createTask(@Body() data: CreateTaskDto, @Request() req){
    return this.tasksServices.createTask(data, req.user.id)
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Update some data about task with id param'})
  @ApiResponse({status: 200, description: 'return the updated task'})
  @ApiResponse({status: 500, description: "Internal server error"})
  @ApiResponse({status: 404, description: "Not Found"})
  updatetask(@Body() data: UpdateTaskDto, @Param('id', ParseIntPipe)  id: number){
    return this.tasksServices.updateTask(data, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Delete a task with the id param'})
  @ApiResponse({status: 200, description: 'return the deleted task'})
  @ApiResponse({status: 500, description: "Internal server error"})
  @ApiResponse({status: 404, description: "Not found"})
  deleteTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksServices.deleteTask(id);
  }
}
