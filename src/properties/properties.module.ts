import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { PropertyRepository } from './repositories/property.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, propertySchema } from './schemas/properties.schema';

@Module({
  controllers: [PropertiesController],
  providers: [
    PropertiesService,
    CreatePropertyUseCase,
    {
      provide: 'IPropertyRepository',
      useClass: PropertyRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: propertySchema,
      },
    ]),
  ],
})
export class PropertiesModule {}
