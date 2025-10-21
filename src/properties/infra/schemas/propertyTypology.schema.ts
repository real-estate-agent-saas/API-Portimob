import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyTypology' })
export class PropertyTypology {
  @Prop()
  name: string;
}

export type PropertyTypologyDocument = PropertyTypology & Document;
export const propertyTypologySchema =
  SchemaFactory.createForClass(PropertyTypology);
