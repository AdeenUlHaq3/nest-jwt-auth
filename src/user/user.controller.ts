import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get('getAllUsers') 
    getAllUsers(): Promise<UserDetails[] | null> {
        return this.userService.findAll();
    }

    @Get('/getUserById/:id') 
    getUser(@Param('id') id: string): Promise<UserDetails | null> {
        return this.userService.findById(id);
    }
}
