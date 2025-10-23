import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    propertyId: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
  ): Promise<PropertyPresenter> {
    // Gets a PropertyEntity instance
    const property = await this.propertyRepository.findOne(propertyId);

    if (!property) throw new NotFoundException('Imóvel não encontrado!');

    // Converts ObjectId into string
    const propertyUserId = property.userId.toString();

    // Compare users
    if (propertyUserId !== userId)
      throw new BadRequestException(
        'Você não tem permissão para acessar esse imóvel!',
      );

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
