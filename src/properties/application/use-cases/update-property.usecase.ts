import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { PropertyResponseDto } from 'src/properties/dtos/property-response.dto';
import { UpdatePropertyDto } from 'src/properties/dtos/update-property.dto';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';
import { PropertyMapper } from 'src/properties/repositories/property.mapper';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyResponseDto> {
    // Gets a PropertyEntity instance
    const property = await this.propertyRepository.findOne(id);

    if (!property) throw new NotFoundException('Nenhum imóvel encontrado!');

    // Updates the object with the new data
    property.update(updatePropertyDto);

    // Persists data on the DB
    const updatedProperty = await this.propertyRepository.update(id, property);

    if (!updatedProperty) throw Error('Erro ao atualizar imóvel');

    return PropertyResponseDto.fromEntity(updatedProperty);
  }
}
