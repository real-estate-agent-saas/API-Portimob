import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Installed modules
import { MongooseModule } from '@nestjs/mongoose';

// Created modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    PropertiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
