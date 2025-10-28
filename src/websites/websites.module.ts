import { Module } from '@nestjs/common';
import { UserWebsitesController } from './controllers/user-websites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './infra/schemas/websites.schema';
import { FindOneWebsiteUseCase } from './application/use-cases/user-websites/find-one.usecase';
import { UpdateWebsiteUseCase } from './application/use-cases/user-websites/update-website.usecase';
import { Specialty, specialtySchema } from './infra/schemas/specialties.schema';
import { SpecialtySeed } from './infra/seeds/specialties.seed';
import { WebsiteRepository } from './infra/repositories/website/website.repository';
import { GetAllSpecialtiesUseCase } from './application/use-cases/user-websites/get-all-specialties.usecase';
import { SpecialtyRepository } from './infra/repositories/specialty/specialty.repository';

@Module({
  controllers: [UserWebsitesController],
  providers: [
    FindOneWebsiteUseCase,
    UpdateWebsiteUseCase,
    GetAllSpecialtiesUseCase,
    SpecialtySeed,
    {
      provide: 'IWebsiteRepository',
      useClass: WebsiteRepository,
    },
    {
      provide: 'ISpecialtyRepository',
      useClass: SpecialtyRepository,
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
