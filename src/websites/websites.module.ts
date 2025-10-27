import { Module } from '@nestjs/common';
import { WebsitesController } from './websites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './infra/schemas/websites.schema';
import { WebsiteRepository } from './infra/repositories/website.repository';
import { FindOneWebsiteUseCase } from './application/use-cases/find-one.usecase';
import { UpdateWebsiteUseCase } from './application/use-cases/update-website.usecase';
import { Specialty } from './entities/website.entity';
import { specialtySchema } from './infra/schemas/specialties.schema';
import { SpecialtySeed } from './infra/seeds/specialties.seed';

@Module({
  controllers: [WebsitesController],
  providers: [
    FindOneWebsiteUseCase,
    UpdateWebsiteUseCase,
    SpecialtySeed,
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
      {
        name: Specialty.name,
        schema: specialtySchema,
      },
    ]),
  ],
  exports: ['IWebsiteRepository'],
})
export class WebsitesModule {}
