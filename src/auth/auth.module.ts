import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: 'secret',
      // signOptions: { expiresIn: '3600s' },
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy]
})
export class AuthModule { }
