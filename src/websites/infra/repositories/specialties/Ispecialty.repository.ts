import { Specialty } from 'src/websites/entities/value-objects/specialty.vo';

export interface ISpecialtyRepository {
  getAllSpecialties(): Promise<Specialty[] | []>;
}
