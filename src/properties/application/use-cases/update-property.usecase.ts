import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyResponseDto } from 'src/properties/dtos/property-response.dto';
import { UpdatePropertyDto } from 'src/properties/dtos/update-property.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyResponseDto | null> {
    const existingProperty = await this.propertyRepository.findOne(id);

    if (!existingProperty)
      throw new NotFoundException('Imóvel não encontrado!');

    const property = await this.propertyRepository.update(
      id,
      updatePropertyDto,
    );

    if (!property) return null;

    return PropertyResponseDto.fromEntity(property);
  }
}
