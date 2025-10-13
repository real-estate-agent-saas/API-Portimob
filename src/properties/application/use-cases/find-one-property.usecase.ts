import { Inject, Injectable } from '@nestjs/common';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class FindOnePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string) {
    return this.propertyRepository.findOne(id);
  }
}
