import { WebsiteEntity } from 'src/websites/entities/website.entity';

export interface IWebsiteRepository {
  create(website: WebsiteEntity): Promise<WebsiteEntity>;
  update(website: WebsiteEntity): Promise<WebsiteEntity | null>;
  findByUserId(userId: string): Promise<WebsiteEntity | null>;
  findBySlug(slug: string): Promise<WebsiteEntity | null>;
}
