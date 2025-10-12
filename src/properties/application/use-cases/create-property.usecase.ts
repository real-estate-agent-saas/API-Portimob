import { Inject, Injectable } from '@nestjs/common';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(createPropertyDto): Promise<any> {


    return this.propertyRepository.create(createPropertyDto);
  }
}
