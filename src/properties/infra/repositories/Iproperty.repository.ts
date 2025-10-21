import { PropertyEntity } from '../../entities/property.entity';

export interface IPropertyRepository {
  create(property: PropertyEntity): Promise<PropertyEntity>;
  update(id: string, property: PropertyEntity): Promise<PropertyEntity | null>;
  findOne(id: string): Promise<PropertyEntity | null>;
  findAll(): Promise<PropertyEntity[]>;
  delete(id: string): Promise<boolean>;
}
