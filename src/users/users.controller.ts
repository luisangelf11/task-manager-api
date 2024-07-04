import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {
  constructor(private usersServices: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get all users in the database'})
  @ApiResponse({status: 200, description: 'return all users'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  getUsers(){
    return this.usersServices.getUsers()
  }
}
