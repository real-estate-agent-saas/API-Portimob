import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertyLeisure,
  PropertyLeisureDocument,
} from '../schemas/propertyLeisure.schema';
import { LEISURE } from '../constants/propertyLeisure';

@Injectable()
export class PropertyLeisureSeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyLeisure.name)
    private readonly propertyLeisureModel: Model<PropertyLeisureDocument>,
  ) {}

  private readonly logger = new Logger(PropertyLeisureSeed.name);

  // As the PorpertyModel loads, this seed runs
  async onModuleInit() {
    for (const name of LEISURE) {
      await this.propertyLeisureModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }

    this.logger.log('PropertyLeisureSeed executed successfully!');
  }
}
