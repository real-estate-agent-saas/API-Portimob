import { Module } from '@nestjs/common';
import { UserWebsitesController } from './controllers/user-websites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './infra/schemas/websites.schema';
import { WebsiteRepository } from './infra/repositories/website.repository';
import { FindOneWebsiteUseCase } from './application/use-cases/user-websites/find-one.usecase';
import { UpdateWebsiteUseCase } from './application/use-cases/user-websites/update-website.usecase';
import { Specialty, specialtySchema } from './infra/schemas/specialties.schema';
import { SpecialtySeed } from './infra/seeds/specialties.seed';

@Module({
  controllers: [UserWebsitesController],
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
