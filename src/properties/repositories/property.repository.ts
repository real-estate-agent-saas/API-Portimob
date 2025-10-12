import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from './Iproperty.repository';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyEntity } from '../entities/property.entity';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<any> {
    return this.propertyModel.create(createPropertyDto);
  }
}
