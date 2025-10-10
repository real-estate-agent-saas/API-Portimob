import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, toLowerCase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Public exibition data
  @Prop({ toLowerCase: true })
  publicEmail: String;

  @Prop()
  whatsapp: String;

  @Prop()
  phone: String;

  @Prop()
  instagram: String;

  @Prop()
  facebook: String;

  @Prop()
  linkedin: String;

  @Prop()
  profileImage: String;

  @Prop()
  bio: String;

  @Prop()
  careerStartDate: Date;

  @Prop()
  creci: String;

  @Prop()
  gender: string;

  @Prop({ default: true })
  isActive: boolean;

}

// Groups User class properties with Document interface methods from mongoose
export type UserDocument = User & Document;

// Create mongoose schema from User class
export const userSchema = SchemaFactory.createForClass(User);
