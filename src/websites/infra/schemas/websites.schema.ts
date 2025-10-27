import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
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

  // IDs
  @Prop()
  templateConfigId: string;

  @Prop()
  userId: string;

  @Prop({
    type: {
      id: String,
      name: String,
      _id: false,
    },
  })
  template?: { id: string; name: string };

  //website data
  @Prop()
  websiteName?: string;

  @Prop()
  slug?: string;

  @Prop()
  customDomain?: string;

  @Prop()
  logoURL?: string;

  //realtor data
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

  @Prop({
    type: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' },
        name: String,
        _id: false,
      },
    ],
  })
  specialties?: Specialty[];
}

export type WebsiteDocument = Website & Document;
export const websiteSchema = SchemaFactory.createForClass(Website);
