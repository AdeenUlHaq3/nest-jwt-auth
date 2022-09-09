import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
    login(@Body() user: ExistingUserDto): Promise<{ token: string } | null> {
        return this.authService.login(user);
    }
}
