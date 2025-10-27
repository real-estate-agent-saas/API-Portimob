import { CreateWebsiteDto } from 'src/websites/dto/create-website.dto';
import { WebsiteEntity } from 'src/websites/entities/website.entity';

export interface IWebsiteRepository {
  create(website: WebsiteEntity): Promise<WebsiteEntity>;
  update(website: WebsiteEntity): Promise<WebsiteEntity | null>;
  findByUserId(userId: string): Promise<WebsiteEntity | null>;
}
