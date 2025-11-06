import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

// Auxiliary class
class TemplateFieldSchema {
  @Prop({ required: true }) key: string;
  @Prop({ required: true }) label: string;
  @Prop({
    required: true,
    enum: ['string', 'text', 'image', 'color', 'link', 'boolean', 'number'],
  })
  type: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  defaultValue: any;
  @Prop({ default: true }) editable: boolean;
  @Prop() helpText?: string;
  @Prop() required?: boolean;
  @Prop() group?: string;
}

@Schema({ timestamps: true, collection: 'templates' })
export class Template {
  _id: Types.ObjectId;
  
  @Prop({ required: true, unique: true })
  templateCode: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  previewImage: string;

  @Prop()
  features: string[];

  @Prop()
  plan: string;

  @Prop({ type: [TemplateFieldSchema], default: [] })
  fields: TemplateFieldSchema[];

  @Prop({ required: true, default: 1 })
  version: number;

  @Prop({ default: true })
  isActive: boolean;
}

export type TemplateDocument = Template & Document;
export const templateSchema = SchemaFactory.createForClass(Template);
