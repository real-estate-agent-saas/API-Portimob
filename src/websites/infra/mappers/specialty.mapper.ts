import { Specialty } from 'src/websites/entities/value-objects/specialty.vo';
import { SpecialtyDocument } from '../schemas/specialties.schema';

export class SpecialtyMapper {
  readonly id: string;
  readonly name: string;

  static toDomain(document: SpecialtyDocument): Specialty {
    return new Specialty(String(document._id), document.name);
  }
}
