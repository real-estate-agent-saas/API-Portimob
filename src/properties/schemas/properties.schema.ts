import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop() price?: number;
  @Prop() area?: number;
  @Prop() roomsQty?: number;
  @Prop() bathroomsQty?: number;
  @Prop() parkingSpacesQty?: number;
  @Prop() youtubeURL?: string;
  @Prop() coverImage?: string;
  @Prop() isFurnished?: boolean;
  @Prop() isNearSubway?: boolean;
  @Prop() isFeatured?: boolean;
  @Prop({ default: true }) isActive?: boolean;

//   @Prop({ type: Object }) propertyType?: { id: string; name: string };
//   @Prop({ type: Object }) propertyPurpose?: { id: string; name: string };
//   @Prop({ type: Object }) propertyStanding?: { id: string; name: string };
//   @Prop({ type: Object }) deliveryStatus?: { id: string; name: string };
//   @Prop({ type: Object }) propertyTypology?: { id: string; name: string };
//   @Prop({ type: Object }) propertyLeisures?: [{ id: string; name: string }];

//   @Prop({ type: Object }) address?: Record<string, any>;

//   @Prop({ type: [{ imageUrl: String, order: Number }] })
//   propertyGallery?: { imageUrl: string; order?: number }[];

//   @Prop({ type: [{ imageUrl: String, order: Number }] })
//   floorPlanGallery?: { imageUrl: string; order?: number }[];

//   @Prop({ required: true }) userId: string;
}

export type PropertyDocument = Property & Document;
export const propertySchema = SchemaFactory.createForClass(Property);