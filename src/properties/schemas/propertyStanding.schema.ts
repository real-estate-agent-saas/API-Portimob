import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyStanding' })
export class PropertyStanding {
  @Prop()
  name: string;
}

export type PropertyStandingDocument = PropertyStanding & Document;
export const propertyStandingSchema =
  SchemaFactory.createForClass(PropertyStanding);
