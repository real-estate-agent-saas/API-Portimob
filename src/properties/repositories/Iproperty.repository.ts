import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropertyEntity } from '../entities/property.entity';

export interface IPropertyRepository {
  create(createPropertyDto: CreatePropertyDto): Promise<any>;
  findAll();
  findOne(id: string);
  delete(id: string);
  update(id: string, updatePropertyDto: UpdatePropertyDto);
}
