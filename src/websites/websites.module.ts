import { Module } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { CreateWebsiteUseCase } from './application/use-cases/create-website.usecase';

@Module({
  controllers: [WebsitesController],
  providers: [WebsitesService, CreateWebsiteUseCase],
})
export class WebsitesModule {}
