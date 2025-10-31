import { Specialty } from 'src/websites/entities/value-objects/specialty.vo';
import {
  SpecialtyDocument,
  Specialty as SpecialtySchema,
} from '../schemas/specialties.schema';
import { FlattenMaps } from 'mongoose';

// To cover both Mongoose Document and plain object
type SpecialtySource = FlattenMaps<SpecialtyDocument> | SpecialtySchema;

export class SpecialtyMapper {
  readonly id: string;
  readonly name: string;

  static toDomain(document: SpecialtySource): Specialty {
    return new Specialty(document._id.toString(), document.name);
  }
}
