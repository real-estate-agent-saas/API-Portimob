import { Module } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { CreateWebsiteUseCase } from './application/use-cases/create-website.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './infra/schemas/websites.schema';
import { WebsiteRepository } from './infra/repositories/website.repository';

@Module({
  controllers: [WebsitesController],
  providers: [
    WebsitesService,
    CreateWebsiteUseCase,
    {
      provide: 'IWebsiteRepository',
      useClass: WebsiteRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Website.name,
        schema: websiteSchema,
      },
    ]),
  ],
  exports: ['IWebsiteRepository'],
})
export class WebsitesModule {}
