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
import { UpdateProfileImageUseCase } from './application/use-cases/user-websites/update-profile-image.usecase';
import { GetSlugUseCase } from './application/use-cases/user-websites/get-slug.usecase';
import { UpdateSlugUseCase } from './application/use-cases/user-websites/update-slug.usecase';
import { CheckSlugAvailabilityUseCase } from './application/use-cases/user-websites/check-slug-availability.usecase';
import { GetWebsiteUseCase } from './application/use-cases/tenant-websites/get-website.usecase';
import { TenantWebsitesController } from './controllers/tenant-websites.controller';
import { ChangeTemplateUseCase } from './application/use-cases/user-websites/change-template.usecase';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  controllers: [UserWebsitesController, TenantWebsitesController],
  providers: [
    FindOneWebsiteUseCase,
    UpdateWebsiteUseCase,
    GetAllSpecialtiesUseCase,
    UpdateProfileImageUseCase,
    GetSlugUseCase,
    UpdateSlugUseCase,
    CheckSlugAvailabilityUseCase,
    ChangeTemplateUseCase,
    SpecialtySeed,

    GetWebsiteUseCase,
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
    TemplatesModule,
  ],
  exports: ['IWebsiteRepository'],
})
export class WebsitesModule {}
