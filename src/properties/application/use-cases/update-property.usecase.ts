import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  ): Promise<PropertyEntity> {
    const updatedProperty = await this.propertyRepository.update(
      id,
      updatePropertyDto,
    );
    if (!updatedProperty) throw new NotFoundException('Imóvel não encontrado!');
    return updatedProperty;
  }
}
