import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import { UpdatePropertyDto } from 'src/properties/dtos/update-property.dto';
import { ForbiddenPropertyUpdate } from 'src/properties/errors/forbidden-property-update.error';
import type { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    propertyId: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
  ): Promise<PropertyPresenter> {
    // Gets a PropertyEntity instance
    const property = await this.propertyRepository.findOne(propertyId);

    if (!property) throw new NotFoundException('Imóvel não encontrado!');

    // Compare users
    if (property.userId !== userId) throw new ForbiddenPropertyUpdate();

    // Updates the object with the new data
    property.update(updatePropertyDto, property.userId);

    // Persists data on the DB
    const updatedProperty = await this.propertyRepository.update(
      propertyId,
      property,
    );

    if (!updatedProperty)
      throw new BadRequestException('Não foi possível atualizar o imóvel!');

    return PropertyPresenter.fromEntity(updatedProperty);
  }
}
