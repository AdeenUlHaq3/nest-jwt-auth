import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { mongoURI } from './config/keys';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
