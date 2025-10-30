import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Website, websiteSchema } from './schemas/websites.schema';
import { Specialty, specialtySchema } from './schemas/specialties.schema';
import { WebsiteRepository } from './repositories/websites/website.repository';
import { SpecialtyRepository } from './repositories/specialties/specialty.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Website.name, schema: websiteSchema },
      { name: Specialty.name, schema: specialtySchema },
    ]),  ],
  providers: [
    { provide: 'IWebsiteRepository', useClass: WebsiteRepository },
    { provide: 'ISpecialtyRepository', useClass: SpecialtyRepository },
  ],
  exports: [
    { provide: 'IWebsiteRepository', useClass: WebsiteRepository },
    { provide: 'ISpecialtyRepository', useClass: SpecialtyRepository },
  ],
})
export class WebsitesInfraModule {}
