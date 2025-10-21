import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROPERTY_STANDINGS } from 'src/properties/constants/propertyStanding';
import { PropertyStanding, PropertyStandingDocument } from '../schemas/propertyStanding.schema';


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
