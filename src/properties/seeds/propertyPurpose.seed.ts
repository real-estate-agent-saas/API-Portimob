import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertyPurpose,
  PropertyPurposeDocument,
} from '../schemas/propertyPurpose.schema';
import { Model } from 'mongoose';
import { PROPERTY_PURPOSES } from '../constants/propertyPurpose';

@Injectable()
export class PropertyPurposeSeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyPurpose.name)
    private readonly propertyPurposeModel: Model<PropertyPurposeDocument>,
  ) {}

  private readonly logger = new Logger(PropertyPurposeSeed.name);

  async onModuleInit() {
    for (const name of PROPERTY_PURPOSES) {
      await this.propertyPurposeModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }

    this.logger.log('PropertyPurposeSeed executed successfully!');
  }
}
