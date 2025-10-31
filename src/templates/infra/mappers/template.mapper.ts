import {
  TemplateEntity,
  TemplateField,
} from 'src/templates/entities/template.entity';
import { Template, TemplateDocument } from '../schemas/templates.schema';
import { FlattenMaps } from 'mongoose';

// To cover both Mongoose Document and plain object
type TemplateSource = FlattenMaps<TemplateDocument> | Template;

export class TemplateMapper {
  static toEntity(doc: TemplateSource): TemplateEntity {
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

  static toDocument(entity: TemplateEntity): Partial<Template> {
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
