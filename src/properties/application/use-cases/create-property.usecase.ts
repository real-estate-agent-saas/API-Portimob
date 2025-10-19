import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyResponseDto } from 'src/properties/dtos/property-response.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(createPropertyDto: CreatePropertyDto): Promise<PropertyResponseDto> {
    const property = PropertyEntity.create(createPropertyDto);
    const createdProperty = await this.propertyRepository.create(property);
    return PropertyResponseDto.fromEntity(createdProperty);
  }
}
  