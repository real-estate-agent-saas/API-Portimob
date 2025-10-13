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

  async create(createPropertyDto: CreatePropertyDto): Promise<any> {
    return this.propertyModel.create(createPropertyDto);
  }

  async findAll() {
    return this.propertyModel
      .find()
      .populate('userId')
      .populate('propertyType.id')
      .populate('propertyTypology.id')
      .populate('propertyStanding.id')
      .populate('propertyPurpose.id')
      .populate('propertyLeisure.id')
      .populate('propertyDeliveryStatus.id');
  }

  async findOne(id: string) {
    return this.propertyModel
      .findById(id)
      .populate('userId')
      .populate('propertyType.id')
      .populate('propertyTypology.id')
      .populate('propertyStanding.id')
      .populate('propertyPurpose.id')
      .populate('propertyLeisure.id')
      .populate('propertyDeliveryStatus.id');
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
