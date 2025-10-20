import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from 'src/properties/dtos/create-property.dto';
import { PropertyPresenter } from 'src/properties/application/presenters/property.presenter';
import type { IPropertyRepository } from 'src/properties/infra/repositories/Iproperty.repository';
import { PropertyEntity } from 'src/properties/entities/property.entity';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyPresenter> {
    const property = PropertyEntity.create(createPropertyDto);
    const createdProperty = await this.propertyRepository.create(property);
    return PropertyPresenter.fromEntity(createdProperty);
  }
}
