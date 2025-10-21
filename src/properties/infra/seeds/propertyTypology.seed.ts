import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROPERTY_TYPOLOGIES } from 'src/properties/constants/propertyTypology';
import { PropertyTypology, PropertyTypologyDocument } from '../schemas/propertyTypology.schema';


@Injectable()
export class PropertyTypologySeed implements OnModuleInit {
  constructor(
    @InjectModel(PropertyTypology.name)
    private readonly propertyTypologyModel: Model<PropertyTypologyDocument>,
  ) {}

  private readonly logger = new Logger(PropertyTypologySeed.name);
  async onModuleInit() {
    for (const name of PROPERTY_TYPOLOGIES) {
      await this.propertyTypologyModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }

    this.logger.log('PropertyTypologySeed executed successfully!');
  }
}
