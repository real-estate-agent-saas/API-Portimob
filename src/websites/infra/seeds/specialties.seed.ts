import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialty, SpecialtyDocument } from '../schemas/specialties.schema';
import { SPECIALTIES } from 'src/websites/constants/specialties';


@Injectable()
export class SpecialtySeed implements OnModuleInit {
  constructor(
    @InjectModel(Specialty.name)
    private readonly specialtyModel: Model<SpecialtyDocument>,
  ) {}

  private readonly logger = new Logger(SpecialtySeed.name);

  async onModuleInit() {
    for (const name of SPECIALTIES) {
      await this.specialtyModel.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true },
      );
    }
    this.logger.log('SpecialtySeed executed successfully!');
  }
}
