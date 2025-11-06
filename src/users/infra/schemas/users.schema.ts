import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({
    type: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' } }],
  })
  propertyIds?: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Website' })
  websiteId?: string;
}

// Groups User class properties with Document interface methods from mongoose
export type UserDocument = User & Document;

// Create mongoose schema from User class
export const userSchema = SchemaFactory.createForClass(User);
