import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Request, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get("/self")
  @HttpCode(HttpStatus.OK)
  validate(@Request() req) 
  {
      if(req.user) return this.usersService.findOne(req.user.id);

      throw new HttpException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "Você não tem permissão!",
      }, HttpStatus.UNAUTHORIZED, {});
  }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //@Roles(Role.Admin, Role.User)
  //@UseGuards(RolesGuard)
  //@IsPublic()
  @Get()
  async findAll(@Request() req) 
  {
    const user = await this.usersService.findOne(req.user.id);
    
    if(user.category.roles.find((role) => role.name == "UsersView"))
    {
      return this.usersService.findAll();
    }

    throw new HttpException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: "Você não tem permissão!",
    }, HttpStatus.UNAUTHORIZED, {});
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
