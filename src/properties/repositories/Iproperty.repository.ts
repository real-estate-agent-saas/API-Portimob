import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { PropertyEntity } from '../entities/property.entity';

export interface IPropertyRepository {
  create(property: PropertyEntity): Promise<PropertyEntity>;
  findOne(id: string): Promise<PropertyEntity | null>;
  findAll(): Promise<PropertyEntity[] | []>;
  update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyEntity | null>;
  delete(id: string): Promise<PropertyEntity | null>;
}
