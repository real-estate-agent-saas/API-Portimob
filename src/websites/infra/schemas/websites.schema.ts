import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  OTHER = 'Outro',
}

export class Specialty {
  readonly id: string;
  readonly name: string;
}

@Schema({ timestamps: true })
export class Website {
  _id: Types.ObjectId;

  // Website data
  @Prop()
  websiteName?: string;

  @Prop()
  slug?: string;

  @Prop()
  customDomain?: string;

  @Prop()
  logoURL?: string;

  // Realtor data
  @Prop()
  realtorName?: string;

  @Prop()
  publicEmail?: string;

  @Prop()
  whatsapp?: string;

  @Prop()
  phone?: string;

  @Prop()
  instagram?: string;

  @Prop()
  facebook?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  profileImage?: string;

  @Prop()
  bio?: string;

  @Prop()
  careerStartDate?: Date;

  @Prop()
  creci?: string;

  @Prop({
    type: String,
    enum: Object.values(Gender),
  })
  gender?: Gender;

  // Relationship data
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TemplatesConfig' })
  templateConfigId: Types.ObjectId;

  @Prop()
  templateCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // Specialty list
  @Prop({
    type: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: false },
        name: { type: String },
        _id: false,
      },
    ],
    default: [],
  })
  specialties?: Specialty[];
}

export const websiteSchema = SchemaFactory.createForClass(Website);
export type WebsiteDocument = Website & Document;
