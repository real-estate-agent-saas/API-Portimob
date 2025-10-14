import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropertyEntity } from '../entities/property.entity';

export interface IPropertyRepository {
  create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>;
  findAll(): Promise<PropertyEntity[] | []>;
  findOne(id: string): Promise<PropertyEntity | null>;


  delete(id: string);
  update(id: string, updatePropertyDto: UpdatePropertyDto);
}
