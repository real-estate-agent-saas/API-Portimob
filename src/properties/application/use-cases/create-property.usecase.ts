import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import type { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    createPropertyDto: CreatePropertyDto,
    userId: string,
  ): Promise<PropertyPresenter> {
    if (!userId)
      throw new BadRequestException(
        'É necessário um usuário para criar um imóvel!',
      );
    const property = PropertyEntity.create(createPropertyDto, userId);
    const createdProperty = await this.propertyRepository.create(property);
    return PropertyPresenter.fromEntity(createdProperty);
  }
}
