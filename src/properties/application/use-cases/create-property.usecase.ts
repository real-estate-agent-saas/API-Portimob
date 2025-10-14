import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from 'src/properties/dto/create-property.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
    return this.propertyRepository.create(createPropertyDto);
  }
}
