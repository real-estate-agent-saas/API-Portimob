import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'specialties' })
export class Specialty {
  @Prop()
  readonly name: string;
}

export type SpecialtyDocument = Specialty & Document;
export const specialtySchema = SchemaFactory.createForClass(Specialty);
