import { Inject, Injectable } from '@nestjs/common';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class FindOnePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string): Promise<PropertyEntity | null> {
    return this.propertyRepository.findOne(id);
  }
}
