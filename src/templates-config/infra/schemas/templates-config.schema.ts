import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'templates_config' })
export class TemplatesConfig {
  _id: Types.ObjectId;

  @Prop({ required: true }) templateCode: string;

  @Prop({ required: true }) userId: string;

  @Prop({ required: true }) websiteId: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  values: Record<string, any>;
}

export type TemplatesConfigDocument = TemplatesConfig & Document;
export const templatesConfigSchema =
  SchemaFactory.createForClass(TemplatesConfig);
