import {
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController 
{
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) 
    {
        return this.authService.login(req.user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async validate(@Request() req) 
    {
        if(req.user) return req.user;

        throw new HttpException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Você não tem permissão!",
        }, HttpStatus.UNAUTHORIZED, {});
    }
}