import {Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService , private prisma: PrismaService) {}

  async validateUser(username: string, password: string){
    try {
        const user = await this.prisma.users.findFirst({
            where:{
                username,
            }
        })

        const isMatch = await bcrypt.compare(password, user.password);
        if(user && isMatch){
            const { password, ...result } = user;
            return result;
        }
        return null
    } catch (error) {
       return null
    }
  }

  async login(user: {username: string, id: number}) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
