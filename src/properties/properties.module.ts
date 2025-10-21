import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertyRepository } from './infra/repositories/property.repository';

// Use cases
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.usecase';
import { FindAllPropertiesUseCase } from './application/use-cases/find-all-properties.usecase';
import { FindOnePropertyUseCase } from './application/use-cases/find-one-property.usecase';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.usecase';

// Schemas
import { Property, propertySchema } from './infra/schemas/properties.schema';
import {
  PropertyLeisure,
  propertyLeisureSchema,
} from './infra/schemas/propertyLeisure.schema';
import {
  PropertyDeliveryStatus,
  propertyDeliveryStatusSchema,
} from './infra/schemas/propertyDeliveryStatus.schema';
import {
  PropertyPurpose,
  propertyPurposeSchema,
} from './infra/schemas/propertyPurpose.schema';
import {
  PropertyStanding,
  propertyStandingSchema,
} from './infra/schemas/propertyStanding.schema';
import {
  PropertyType,
  propertyTypeSchema,
} from './infra/schemas/propertyType.schema';
import {
  PropertyTypology,
  propertyTypologySchema,
} from './infra/schemas/propertyTypology.schema';

// Seeds
import { PropertyDeliveryStatusSeed } from './infra/seeds/propertyDeliveryStatus.seed';
import { PropertyPurposeSeed } from './infra/seeds/propertyPurpose.seed';
import { PropertyStandingSeed } from './infra/seeds/propertyStanding.seed';
import { PropertyLeisureSeed } from './infra/seeds/propertytLeisure.seed';
import { PropertyTypeSeed } from './infra/seeds/propertyType.seed';
import { PropertyTypologySeed } from './infra/seeds/propertyTypology.seed';

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
