import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { PropertyEntity } from '../entities/property.entity';

export interface IPropertyRepository {
  create(propertyData: PropertyEntity): Promise<PropertyEntity>;

  update(
    id: string,
    propertyData: PropertyEntity,
  ): Promise<PropertyEntity | null>;

  findOne(id: string): Promise<PropertyEntity | null>;

  findAll(): Promise<PropertyEntity[]>;
  delete(id: string): Promise<boolean>;
}
