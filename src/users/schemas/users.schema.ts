import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, toLowerCase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ toLowerCase: true })
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

  @Prop()
  gender?: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop([String])
  specialtyIds?: string[];

  @Prop([String])
  propertyIds?: string[];

  @Prop()
  dynamicWebsiteId?: string;
}

// Groups User class properties with Document interface methods from mongoose
export type UserDocument = User & Document;

// Create mongoose schema from User class
export const userSchema = SchemaFactory.createForClass(User);
