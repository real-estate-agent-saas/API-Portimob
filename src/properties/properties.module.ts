import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { PropertyRepository } from './repositories/property.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, propertySchema } from './schemas/properties.schema';
import { Leisure, leisureSchema } from './schemas/leisure.schema';

@Module({
  controllers: [PropertiesController],
  providers: [
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
      {
        name: Leisure.name,
        schema: leisureSchema,
      },
    ]),
  ],
})
export class PropertiesModule {}
