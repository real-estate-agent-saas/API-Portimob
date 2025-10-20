import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyPurpose' })
export class PropertyPurpose {
  @Prop()
  name: string;
}

export type PropertyPurposeDocument = PropertyPurpose & Document;
export const propertyPurposeSchema =
  SchemaFactory.createForClass(PropertyPurpose);
