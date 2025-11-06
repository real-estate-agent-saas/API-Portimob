import { Inject, Injectable } from '@nestjs/common';
import { Specialty } from 'src/websites/entities/value-objects/specialty.vo';
import type { ISpecialtyRepository } from 'src/websites/infra/repositories/specialties/Ispecialty.repository';

@Injectable()
export class GetAllSpecialtiesUseCase {
  constructor(
    @Inject('ISpecialtyRepository')
    private specialtyRepository: ISpecialtyRepository,
  ) {}

  async execute(): Promise<Specialty[] | []> {
    return this.specialtyRepository.getAllSpecialties();
  }
}
