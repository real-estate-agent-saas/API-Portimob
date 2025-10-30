import { Module } from '@nestjs/common';
import { UserWebsitesController } from './user-websites.controller';
import { TemplatesModule } from 'src/templates/templates.module';
import { WebsitesInfraModule } from '../infra/websites-infra.module';
import { ChangeTemplateUseCase } from './application/use-cases/change-template.usecase';
import { CheckSlugAvailabilityUseCase } from './application/use-cases/check-slug-availability.usecase';
import { GetAllSpecialtiesUseCase } from './application/use-cases/get-all-specialties.usecase';
import { GetSlugUseCase } from './application/use-cases/get-slug.usecase';
import { GetUserWebsiteUseCase } from './application/use-cases/get-user-website.usecase';
import { UpdateProfileImageUseCase } from './application/use-cases/update-profile-image.usecase';
import { UpdateSlugUseCase } from './application/use-cases/update-slug.usecase';
import { UpdateWebsiteUseCase } from './application/use-cases/update-website.usecase';

@Module({
  imports: [WebsitesInfraModule, TemplatesModule],
  controllers: [UserWebsitesController],
  providers: [
    ChangeTemplateUseCase,
    CheckSlugAvailabilityUseCase,
    GetAllSpecialtiesUseCase,
    GetSlugUseCase,
    GetUserWebsiteUseCase,
    UpdateProfileImageUseCase,
    UpdateSlugUseCase,
    UpdateWebsiteUseCase,
  ],
})
export class UserWebsitesModule {}
