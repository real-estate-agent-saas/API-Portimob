import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  Specialty,
  SpecialtyDocument,
} from '../users/schemas/specialties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SPECIALTIES } from '../common/constants/seeds-values/specialties.constants';

@Injectable()
export class SpecialtySeeder implements OnModuleInit {
  private readonly logger = new Logger(SpecialtySeeder.name);

  constructor(
    @InjectModel(Specialty.name)
    private readonly specialtyModel: Model<SpecialtyDocument>,
  ) {}

  // As the UserModel loads this seed runs
  async onModuleInit() {
    // For each specialty name creates a document on MongoDB
    for (let i = 0; i < SPECIALTIES.length; i++) {
      const id = i + 1;

      const name = SPECIALTIES[i];
      const specialtyExists = await this.specialtyModel.findOne({ name });
      if (!specialtyExists) {
        await this.specialtyModel.create({ _id: id, name });
        this.logger.log(`Specialty criada: ${name}`);
      }
    }

    this.logger.log('Seed Specialty rodada com sucesso!');
  }
}
