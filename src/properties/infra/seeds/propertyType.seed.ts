import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertyType, PropertyTypeDocument } from '../schemas/propertyType.schema';
import { PROPERTY_TYPES } from 'src/properties/constants/propertyType';

@Injectable()
export class PropertyTypeSeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyType.name)
    private readonly propertyTypeModel: Model<PropertyTypeDocument>,
  ) {}
  private readonly logger = new Logger(PropertyTypeSeed.name);

  async onModuleInit() {
    for (const name of PROPERTY_TYPES) {
      await this.propertyTypeModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }

    this.logger.log('PropertyTypeSeed executed successfully!');
  }
}
