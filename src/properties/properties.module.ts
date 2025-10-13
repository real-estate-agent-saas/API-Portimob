import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertyRepository } from './repositories/property.repository';

// Use cases
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { FindAllPropertiesUseCase } from './application/use-cases/find-all-properties.usecase';
import { FindOnePropertyUseCase } from './application/use-cases/find-one-property.usecase';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.usecase';

// Schemas
import { Property, propertySchema } from './schemas/properties.schema';
import {
  PropertyLeisure,
  propertyLeisureSchema,
} from './schemas/propertyLeisure.schema';
import {
  PropertyDeliveryStatus,
  propertyDeliveryStatusSchema,
} from './schemas/propertyDeliveryStatus.schema';
import {
  PropertyPurpose,
  propertyPurposeSchema,
} from './schemas/propertyPurpose.schema';
import {
  PropertyStanding,
  propertyStandingSchema,
} from './schemas/propertyStanding.schema';
import {
  PropertyType,
  propertyTypeSchema,
} from './schemas/propertyType.schema';
import {
  PropertyTypology,
  propertyTypologySchema,
} from './schemas/propertyTypology.schema';

// Seeds
import { PropertyLeisureSeed } from './seeds/propertytLeisure.seed';
import { PropertyDeliveryStatusSeed } from './seeds/propertyDeliveryStatus.seed';
import { PropertyPurposeSeed } from './seeds/propertyPurpose.seed';
import { PropertyStandingSeed } from './seeds/propertyStanding.seed';
import { PropertyTypeSeed } from './seeds/propertyType.seed';
import { PropertyTypologySeed } from './seeds/propertyTypology.seed';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.usecase';

@Module({
  controllers: [PropertiesController],
  providers: [
    CreatePropertyUseCase,
    FindAllPropertiesUseCase,
    FindOnePropertyUseCase,
    DeletePropertyUseCase,
    UpdatePropertyUseCase,

    PropertyLeisureSeed,
    PropertyDeliveryStatusSeed,
    PropertyPurposeSeed,
    PropertyStandingSeed,
    PropertyTypeSeed,
    PropertyTypologySeed,
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
        name: PropertyLeisure.name,
        schema: propertyLeisureSchema,
      },
      {
        name: PropertyDeliveryStatus.name,
        schema: propertyDeliveryStatusSchema,
      },
      {
        name: PropertyPurpose.name,
        schema: propertyPurposeSchema,
      },
      { name: PropertyStanding.name, schema: propertyStandingSchema },
      { name: PropertyType.name, schema: propertyTypeSchema },
      { name: PropertyTypology.name, schema: propertyTypologySchema },
    ]),
  ],
})
export class PropertiesModule {}
