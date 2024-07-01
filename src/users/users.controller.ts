import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(@Request() req){
    return this.usersServices.getUsers()
  }
}
