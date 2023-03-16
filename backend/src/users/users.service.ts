import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserDetail } from 'src/auth/models/UserDetail';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService 
{
  constructor(private prisma: PrismaService) {}

  async findOne(
    id: string,
  ): Promise<UserDetail | null> 
  {
    const user = await this.prisma.user.findUnique({
      where: {id},
      select: 
      {
        id: true,
        email: true,
        name: true,
        password: false,
        category: 
        {
          select: 
          {
            name: true,
            roles: {
              select: {
                name: true,
              }
            }
          },
        },
      },
    });

    return user;
  }

  async findAll()
  {
    return this.prisma.user.findMany({
      select: 
      {
        id: true,
        email: true,
        name: true,
        password: false,
        categoryId: true
      },
    });
  }
  
  async create(data: CreateUserDto): Promise<User> 
  {
    //const authority = this.prisma.authority;

    const newData : CreateUserDto = {
      ...data,
      category: {
        connect: { id:1 }
      },
      password: await bcrypt.hash(data.password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data:newData,
    }).catch((e) => 
    {
      throw new BadRequestException(e);
    });

    return {
      ...createdUser,
      password: undefined
    }
  }

  async update(
    id: string,
    data: UpdateUserDto
  ): Promise<User> 
  {
    if(!await this.findOne(id))
    {
      throw new NotFoundException("User Not Found");
    }

    return this.prisma.user.update({
      data,
      where:{id},
    }).catch((e) => 
    {
      throw new BadRequestException(e);
    });
  }

  async remove(id : string): Promise<User> 
  {
    if(!await this.findOne(id))
    {
      throw new NotFoundException("User Not Found");
    }

    return this.prisma.user.delete({
      where:{id},
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst(
    {
        where:
        {
            email:email
        }
    });
  }
}
