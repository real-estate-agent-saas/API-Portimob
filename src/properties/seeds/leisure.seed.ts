import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Leisure, LeisureDocument } from '../schemas/leisure.schema';
import { LEISURE } from '../constants/leisure';

@Injectable()
export class LeisureSeed implements OnModuleInit {
  constructor(
    @InjectModel(Leisure.name)
    private readonly leisureModel: Model<LeisureDocument>,
  ) {}

  private readonly logger = new Logger(LeisureSeed.name);

  // As the PorpertyModel loads, this seed runs
  async onModuleInit() {
    for (const name of LEISURE) {
      await this.leisureModel.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { upsert: true, new: true },
      );
    }

    this.logger.log('LeisureSeed rodada com sucesso!');
  }
}
