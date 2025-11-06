import { TemplateEntity } from 'src/templates/entities/template.entity';

export class TemplatePresenter {
  readonly templateCode: string;
  readonly name: string;
  readonly description: string;
  readonly previewImage: string;
  readonly plan: string;
  readonly features: string[];

  constructor(props: TemplatePresenter) {
    Object.assign(this, props);
  }

  static fromEntity(templateEntity: TemplateEntity): TemplatePresenter {
    return new TemplatePresenter({
      templateCode: templateEntity.templateCode,
      name: templateEntity.name,
      description: templateEntity.description,
      previewImage: templateEntity.previewImage,
      plan: templateEntity.plan,
      features: templateEntity.features,
    });
  }
}
