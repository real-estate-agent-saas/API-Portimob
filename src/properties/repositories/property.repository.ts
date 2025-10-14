import { Injectable } from '@nestjs/common';
import { IPropertyRepository } from './Iproperty.repository';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyEntity } from '../entities/property.entity';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
    const createdProperty = await this.propertyModel.create(createPropertyDto);
    const plain = createdProperty.toObject();
    const { _id, title, userId, ...rest } = plain;
    return new PropertyEntity(title, userId, _id?.toString(), rest);
  }

  async findAll(): Promise<PropertyEntity[] | []> {
    const properties = await this.propertyModel.find();
    if (!properties) return [];
    const propertyEntities = properties.map((propertyDoc) => {
      const { _id, title, userId, ...rest } = propertyDoc.toObject();
      return new PropertyEntity(title, userId, _id?.toString(), rest);
    });
    return propertyEntities;
  }

  async findOne(id: string): Promise<PropertyEntity | null> {
    const property = await this.propertyModel.findById(id);

    if (!property) return null;

    const { _id, title, userId, ...rest } = property.toObject();

    const propertyEntity = new PropertyEntity(title, userId, _id?.toString(), rest);

    return propertyEntity;
  }

  async delete(id: string) {
    return this.propertyModel.findByIdAndDelete(id);
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyModel.findByIdAndUpdate(id, updatePropertyDto, {
      new: true,
    });
  }
}
