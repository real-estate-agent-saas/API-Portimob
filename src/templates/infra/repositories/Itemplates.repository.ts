import { TemplateEntity } from 'src/templates/entities/template.entity';

export interface ITemplatesRepository {
  findByCode(templateCode: string): Promise<TemplateEntity | null>;
}
