import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyEntity } from '../entities/property.entity';

export interface IPropertyRepository {
  create(createPropertyDto: CreatePropertyDto): Promise<any>;
}
