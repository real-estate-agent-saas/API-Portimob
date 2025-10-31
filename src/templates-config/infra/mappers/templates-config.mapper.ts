import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import {
  TemplatesConfig,
  TemplatesConfigDocument,
} from '../schemas/templates-config.schema';
import { FlattenMaps, Types } from 'mongoose';

// To cover both Mongoose Document and plain object
type TemplateConfigSource =
  | FlattenMaps<TemplatesConfigDocument>
  | TemplatesConfig;

export class TemplatesConfigMapper {
  static toEntity(doc: TemplateConfigSource): TemplateConfigEntity {
    return TemplateConfigEntity.create({
      id: doc._id.toString(),
      templateCode: doc.templateCode,
      userId: doc.userId.toString(),
      websiteId: doc.websiteId.toString(),
      values: doc.values,
    });
  }

  static toDocument(entity: TemplateConfigEntity): Partial<TemplatesConfig> {
    return {
      templateCode: entity.templateCode,
      userId: new Types.ObjectId(entity.userId),
      websiteId: new Types.ObjectId(entity.websiteId),
      values: entity.values,
    };
  }
}
