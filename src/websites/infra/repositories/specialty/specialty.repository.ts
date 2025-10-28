import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialty as SpecialtySchema, SpecialtyDocument } from '../../schemas/specialties.schema';
import { Specialty as SpecialtyVO } from 'src/websites/entities/value-objects/specialty.vo';

import { ISpecialtyRepository } from './Ispecialty.repository';
import { SpecialtyMapper } from '../../mappers/specialty.mapper';

export class SpecialtyRepository implements ISpecialtyRepository {
  constructor(
    @InjectModel(SpecialtySchema.name)
    private specialtyModel: Model<SpecialtyDocument>,
  ) {}

  async getAllSpecialties(): Promise<SpecialtyVO[]> {
    const specialties = await this.specialtyModel.find();
    return specialties.map(SpecialtyMapper.toDomain);
  }
}
