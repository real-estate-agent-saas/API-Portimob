import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from './Iproperty.repository';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyEntity } from '../entities/property.entity';
import { PropertyMapper } from './property.mapper';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(propertyData: PropertyEntity): Promise<PropertyEntity> {
    const propertyDoc = PropertyMapper.toPersistence(propertyData);
    const createdProperty = await this.propertyModel.create(propertyDoc);
    const propertyEntity = PropertyMapper.toEntity(createdProperty);
    return propertyEntity;
  }

  async update(
    id: string,
    propertyData: PropertyEntity,
  ): Promise<PropertyEntity | null> {
    // Converts PropertyEntity into a persistence object
    const persistenceModel = PropertyMapper.toPersistence(propertyData);
    // Updates property and return the new document
    const updatedProperty = await this.propertyModel.findByIdAndUpdate(
      id,
      { $set: persistenceModel },
      { new: true },
    );
    if (!updatedProperty) return null;
    return PropertyMapper.toEntity(updatedProperty);
  }

  async findOne(id: string): Promise<PropertyEntity | null> {
    const property = await this.propertyModel.findById(id);
    if (!property) return null;
    const propertyEntity = PropertyMapper.toEntity(property);
    return propertyEntity;
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
