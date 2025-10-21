import { Injectable, Inject } from '@nestjs/common';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

@Injectable()
export class FindAllPropertiesUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(): Promise<PropertyEntity[] | []> {
    return this.propertyRepository.findAll();
  }
}
