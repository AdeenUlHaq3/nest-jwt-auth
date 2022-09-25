import { Response } from 'express';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/interfaces/user.interface';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() user: NewUserDto): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: ExistingUserDto, @Res({ passthrough: true }) response: Response): Promise<{ token: string | null }> {
        const jwt = await this.authService.login(user);

        response.cookie("auth-cookie", jwt?.token, { httpOnly: true })

        return jwt;
    }
}
