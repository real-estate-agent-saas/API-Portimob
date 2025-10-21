import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DELIVERY_STATUS } from 'src/properties/constants/propertyDeliveryStatus';
import { PropertyDeliveryStatus, PropertyDeliveryStatusDocument } from '../schemas/propertyDeliveryStatus.schema';


@Injectable()
export class PropertyDeliveryStatusSeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyDeliveryStatus.name)
    private readonly deliveryStatusModel: Model<PropertyDeliveryStatusDocument>,
  ) {}

  private readonly logger = new Logger(PropertyDeliveryStatusSeed.name);

  // As the PorpertyModel loads, this seed runs
  async onModuleInit() {
    for (const name of DELIVERY_STATUS) {
      await this.deliveryStatusModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }

    this.logger.log('PropertyDeliveryStatusSeed executed successfully!');
  }
}
