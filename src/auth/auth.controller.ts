import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({summary: 'Create a new user in the database'})
  @ApiResponse({status: 200, description: 'The user was created'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  register(@Body() userRegister: CreateUserDto) {
    return this.userService.createUser(userRegister);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get the logged-in users profile'})
  @ApiResponse({status: 200, description: 'return a profile'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  @ApiResponse({status: 404, description: 'Not Found'})
  profile(@Request() req){
    return this.userService.findProfile(req.user.id)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({summary: 'Login with an account'})
  @ApiResponse({status: 200, description: 'User logged-in'})
  @ApiResponse({status: 501, description: 'Unauthorized'})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
