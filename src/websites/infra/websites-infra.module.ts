import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './schemas/websites.schema';
import { Specialty, specialtySchema } from './schemas/specialties.schema';
import { WebsiteRepository } from './repositories/websites/website.repository';
import { SpecialtyRepository } from './repositories/specialties/specialty.repository';
import { WebsitesHelper } from './helpers/websites.helper';
import { TemplatesConfigModule } from 'src/templates-config/templates-config.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Website.name, schema: websiteSchema },
      { name: Specialty.name, schema: specialtySchema },
    ]),
    TemplatesConfigModule,
  ],
  providers: [
    { provide: 'IWebsiteRepository', useClass: WebsiteRepository },
    { provide: 'ISpecialtyRepository', useClass: SpecialtyRepository },
    WebsitesHelper,
  ],
  exports: ['IWebsiteRepository', 'ISpecialtyRepository', WebsitesHelper],
})
export class WebsitesInfraModule {}
