import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import { WebsiteEntity } from 'src/websites/entities/website.entity';

export interface IWebsiteRepository {
  create(website: WebsiteEntity): Promise<WebsiteEntity>;
  update(website: WebsiteEntity): Promise<WebsiteEntity | null>;
  findOneByUserId(userId: string): Promise<WebsiteEntity | null>;
  findOneBySlug(slug: string): Promise<{
    website: WebsiteEntity;
    templateConfig?: TemplateConfigEntity;
  } | null>;
}
