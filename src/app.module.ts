import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Installed modules
import { MongooseModule } from '@nestjs/mongoose';

// Created modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TemplatesConfigModule } from './templates-config/templates-config.module';
import { TemplatesModule } from './templates/templates.module';
import { UserWebsitesModule } from './websites/user-website/user-websites.module';
import { TenantWebsitesModule } from './websites/tenant-website/tenant-websites.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    PropertiesModule,
    TemplatesConfigModule,
    TemplatesModule,
    UserWebsitesModule,
    TenantWebsitesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
