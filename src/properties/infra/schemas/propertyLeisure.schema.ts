import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'propertyLeisure' })
export class PropertyLeisure {
  @Prop()
  name: string;
}

export type PropertyLeisureDocument = PropertyLeisure & Document;
export const propertyLeisureSchema = SchemaFactory.createForClass(PropertyLeisure);
