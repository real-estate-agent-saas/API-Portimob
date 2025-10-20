import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyDeliveryStatus' })
export class PropertyDeliveryStatus {
  @Prop()
  name: string;
}

export type PropertyDeliveryStatusDocument = PropertyDeliveryStatus & Document;
export const propertyDeliveryStatusSchema = SchemaFactory.createForClass(
  PropertyDeliveryStatus,
);
