import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService 
{
    constructor(
      private readonly jwtService: JwtService, 
      private readonly usersService: UsersService
    ) {}
    
    async login(user: User): Promise<UserToken> {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };
  
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async validateUser(email: string, pass: string): Promise<any> 
    {
        const user = await this.usersService.findByEmail(email);
        if (user) 
        {
          const isPasswordValid = await bcrypt.compare(pass, user.password);
          if (isPasswordValid) 
          {
            return {
              ...user,
              password: undefined,
            };
          }
        }
    
        throw new UnauthorizedError(
          'Email address or password provided is incorrect.',
        );
    }
}