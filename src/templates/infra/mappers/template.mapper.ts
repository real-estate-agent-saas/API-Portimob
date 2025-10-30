import {
  TemplateEntity,
  TemplateField,
} from 'src/templates/entities/template.entity';
import { TemplateDocument } from '../schemas/templates.schema';

export class TemplateMapper {
  static toEntity(doc: TemplateDocument): TemplateEntity {
    return TemplateEntity.create({
      id: doc._id.toString(),
      templateCode: doc.templateCode,
      name: doc.name,
      description: doc.description,
      previewImage: doc.previewImage,
      plan: doc.plan,
      features: doc.features,
      fields:
        doc.fields?.map((f) => ({
          key: f.key,
          label: f.label,
          type: f.type as TemplateField['type'],
          defaultValue: f.defaultValue,
          editable: f.editable,
          helpText: f.helpText,
          required: f.required,
          group: f.group,
        })) ?? [],
      version: doc.version,
    });
  }

  static toDocument(entity: TemplateEntity): TemplateDocument {
    return {
      templateCode: entity.templateCode,
      name: entity.name,
      description: entity.description,
      previewImage: entity.previewImage,
      plan: entity.plan,
      features: entity.features,
      fields: entity.fields.map((f) => ({
        key: f.key,
        label: f.label,
        type: f.type,
        defaultValue: f.defaultValue,
        editable: f.editable,
        helpText: f.helpText,
        required: f.required,
        group: f.group,
      })),
      version: entity.version,
    } as TemplateDocument;
  }
}
