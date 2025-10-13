import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertyStanding,
  PropertyStandingDocument,
} from '../schemas/propertyStanding.schema';
import { Model } from 'mongoose';
import { PROPERTY_STANDINGS } from '../constants/propertyStanding';

@Injectable()
export class PropertyStandingSeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyStanding.name)
    private readonly propertyStandingModel: Model<PropertyStandingDocument>,
  ) {}

  private readonly logger = new Logger(PropertyStandingSeed.name);

  async onModuleInit() {
    for (const name of PROPERTY_STANDINGS) {
      await this.propertyStandingModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }
    this.logger.log('PropertyStandingSeed executed successfully!');
  }
}
