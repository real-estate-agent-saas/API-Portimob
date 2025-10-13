import { Injectable, Inject } from '@nestjs/common';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class FindAllPropertiesUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute() {
    return this.propertyRepository.findAll();
  }
}
