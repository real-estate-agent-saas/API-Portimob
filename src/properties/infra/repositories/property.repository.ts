import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from './Iproperty.repository';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyEntity } from '../../entities/property.entity';
import { PropertyMapper } from '../mappers/property.mapper';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(property: PropertyEntity): Promise<PropertyEntity> {
    const propertyDoc = PropertyMapper.toDocument(property);
    const createdProperty = await this.propertyModel.create(propertyDoc);
    return PropertyMapper.toEntity(createdProperty);
  }

  async update(
    id: string,
    property: PropertyEntity,
  ): Promise<PropertyEntity | null> {
    const propertyDoc = PropertyMapper.toDocument(property);
    const updatedProperty = await this.propertyModel.findByIdAndUpdate(
      id,
      { $set: propertyDoc },
      { new: true },
    );
    if (!updatedProperty) return null;
    return PropertyMapper.toEntity(updatedProperty);
  }

  async findOne(id: string): Promise<PropertyEntity | null> {
    const property = await this.propertyModel.findById(id);
    if (!property) return null;
    return PropertyMapper.toEntity(property);
  }

  async findAll(): Promise<PropertyEntity[] | []> {
    const properties = await this.propertyModel.find();
    if (!properties) return [];
    const propertiesEntity = properties.map((property) =>
      PropertyMapper.toEntity(property),
    );
    return propertiesEntity;
  }

  async delete(id: string): Promise<boolean> {
    const deletedProperty = await this.propertyModel.findByIdAndDelete(id);
    return deletedProperty != null;
  }
}
