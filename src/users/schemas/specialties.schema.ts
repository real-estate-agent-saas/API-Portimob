import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Specialty {
  @Prop({ _id: false, required: true })
  _id: number;

  @Prop({ required: true })
  name: string;
}

export type SpecialtyDocument = Specialty & Document;
export const specialtySchema = SchemaFactory.createForClass(Specialty);
