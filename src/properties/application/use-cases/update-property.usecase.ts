import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import { UpdatePropertyDto } from 'src/properties/dtos/update-property.dto';
import type { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyPresenter> {
    // Gets a PropertyEntity instance
    const existingProperty = await this.propertyRepository.findOne(id);

    if (!existingProperty)
      throw new NotFoundException('Imóvel não encontrado!');

    // Updates the object with the new data
    existingProperty.update(updatePropertyDto);

    // Persists data on the DB
    const updatedProperty = await this.propertyRepository.update(
      id,
      existingProperty,
    );

    if (!updatedProperty)
      throw new NotFoundException('Imóvel não encontrado para atualização');

    return PropertyPresenter.fromEntity(updatedProperty);
  }
}
