import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import { TemplatesConfigDocument } from '../schemas/templates-config.schema';
import { TemplateConfigPersistenceModel } from '../models/template-config-persistence.model';

export class TemplatesConfigMapper {
  static toEntity(doc: TemplatesConfigDocument): TemplateConfigEntity {
    return TemplateConfigEntity.create({
      id: doc._id.toString(),
      templateCode: doc.templateCode,
      userId: doc.userId,
      websiteId: doc.websiteId,
      values: doc.values,
    });
  }

  static toDocument(
    entity: TemplateConfigEntity,
  ): TemplateConfigPersistenceModel {
    return {
      templateCode: entity.templateCode,
      userId: entity.userId,
      websiteId: entity.websiteId,
      values: entity.values,
    };
  }
}
