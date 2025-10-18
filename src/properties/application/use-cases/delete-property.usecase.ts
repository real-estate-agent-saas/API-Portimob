import { Inject, Injectable } from '@nestjs/common';
import type { IPropertyRepository } from 'src/properties/repositories/Iproperty.repository';

@Injectable()
export class DeletePropertyUseCase {
  constructor(
    @Inject('IPropertyRepository')
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.propertyRepository.delete(id);
  }
}
