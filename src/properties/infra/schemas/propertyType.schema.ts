import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyType' })
export class PropertyType {
  @Prop()
  name: string;
}

export type PropertyTypeDocument = PropertyType & Document;
export const propertyTypeSchema = SchemaFactory.createForClass(PropertyType);