import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './entities/userEntity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<IUser[] | HttpException> {
    try {
      const users = await this.prisma.users.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          lastname: true
        },
      });
      return users;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          `Internal server error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async createUser(user: CreateUserDto): Promise<IUser | HttpException> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      const newUser = await this.prisma.users.create({
        data: {
          username: user.username,
          password: hash,
          name: user.name,
          lastname: user.lastname,
        },
      });
      return newUser;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          `Internal server error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findProfile(id: number) {
    try {
      const profile = await this.prisma.users.findFirst({
        where: {
          id,
        },
      });
      if (profile) {
        const { password, ...result } = profile;
        return result;
      }
      throw new Error(`Profile is not found`);
    } catch (error) {
      if (error instanceof Error) throw new NotFoundException(error.message);
    }
  }
}
