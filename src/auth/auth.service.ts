import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/user/interfaces/user.interface';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<NewUserDto>): Promise<UserDetails | any> {
        const {
            name,
            email,
            password,
        } = user;

        const existingUser = await this.userService.findByEmail(email);
        console.log(existingUser);


        if (existingUser) return 'Email taken!';

        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashedPassword);

        return this.userService.getUserDetails(newUser);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;

        if (!user) return null;

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if (!doesPasswordMatch) return null;

        return this.userService.getUserDetails(user);
    }

    async login(existingUser: ExistingUserDto): Promise<{ token: string } | null> {
        const {
            email,
            password
        } = existingUser;

        const user = await this.validateUser(email, password);

        if (!user) return null;

        const jwt = await this.jwtService.signAsync({ user });

        return { token: jwt };
    }
}
