import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Leisure {
  @Prop()
  name: string;
}

export type LeisureDocument = Leisure & Document;
export const leisureSchema = SchemaFactory.createForClass(Leisure);
