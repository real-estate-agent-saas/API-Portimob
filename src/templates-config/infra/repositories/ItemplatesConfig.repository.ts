import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';

export interface ITemplatesConfigRepository {
  create(templateConfigEntity: TemplateConfigEntity): Promise<TemplateConfigEntity>;
}
