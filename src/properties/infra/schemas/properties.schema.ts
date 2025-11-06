import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Property {
  _id: Types.ObjectId;
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop() price?: number;
  @Prop() area?: number;
  @Prop() roomsQty?: number;
  @Prop() bathroomsQty?: number;
  @Prop() parkingSpacesQty?: number;
  @Prop() videoUrl?: string;
  @Prop() coverImage?: string;
  @Prop() isFurnished?: boolean;
  @Prop() isNearSubway?: boolean;
  @Prop() isFeatured?: boolean;
  @Prop({ default: true }) isActive?: boolean;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyType' },
      name: String,
      _id: false,
    },
  })
  propertyType?: { id: string; name: string };

  @Prop({
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyPurpose' },
      name: String,
      _id: false,
    },
  })
  propertyPurpose?: { id: string; name: string };

  @Prop({
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyStanding' },
      name: String,
      _id: false,
    },
  })
  propertyStanding?: { id: string; name: string };

  @Prop({
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyDeliveryStatus',
      },
      name: String,
      _id: false,
    },
  })
  propertyDeliveryStatus?: { id: string; name: string };

  @Prop({
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyTypology',
      },
      name: String,
      _id: false,
    },
  })
  propertyTypology?: { id: string; name: string };

  @Prop({
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PropertyLeisure',
        },
        name: String,
        _id: false,
      },
    ],
  })
  propertyLeisure?: { id: string; name: string }[];

  @Prop({ type: [{ imageUrl: String, order: Number }] })
  propertyGallery?: { imageUrl: string; order: number }[];

  @Prop({ type: [{ imageUrl: String, order: Number }] })
  propertyFloorPlanGallery?: { imageUrl: string; order: number }[];

  @Prop({
    type: {
      street: String,
      propertyNumber: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
      zone: String,
      _id: false,
    },
  })
  address?: {
    street?: string;
    propertyNumber?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    zone?: string;
  };
}

export type PropertyDocument = Property & Document;
export const propertySchema = SchemaFactory.createForClass(Property);
