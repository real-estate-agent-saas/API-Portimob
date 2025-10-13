import { Inject, Injectable } from '@nestjs/common';
import { UpdatePropertyDto } from 'src/properties/dto/update-property.dto';
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
  ): Promise<any> {
    return this.propertyRepository.update(id, updatePropertyDto);
  }
}
