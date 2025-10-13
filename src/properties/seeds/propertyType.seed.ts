import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertyType,
  PropertyTypeDocument,
} from '../schemas/propertyType.schema';
import { Model } from 'mongoose';
import { PROPERTY_TYPES } from '../constants/propertyType';

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
