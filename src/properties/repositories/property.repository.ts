import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from './Iproperty.repository';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyEntity } from '../entities/property.entity';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { PropertyMapper } from './property.mapper';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(property: PropertyEntity): Promise<PropertyEntity> {
    const createdProperty = await this.propertyModel.create(property);
    const propertyEntity = PropertyMapper.toEntity(createdProperty);
    return propertyEntity;
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

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyEntity | null> {
    const updatedProperty = await this.propertyModel.findByIdAndUpdate(
      id,
      updatePropertyDto,
      { new: true },
    );
    if (!updatedProperty) return null;
    const updatedPropertyEntity = PropertyMapper.toEntity(updatedProperty);
    return updatedPropertyEntity;
  }

  async delete(id: string): Promise<PropertyEntity | null> {
    const deletedProperty = await this.propertyModel.findByIdAndDelete(id);
    if (!deletedProperty) return null;
    const deletedPropertyEntity = PropertyMapper.toEntity(deletedProperty);
    return deletedPropertyEntity;
  }
}
