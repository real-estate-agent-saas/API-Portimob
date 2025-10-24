import { CreateWebsiteDto } from 'src/websites/dto/create-website.dto';
import { IWebsiteRepository } from './Iwebsite.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Website, WebsiteDocument } from '../schemas/websites.schema';
import { Model } from 'mongoose';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { WebsiteMapper } from '../mappers/website.mapper';

export class WebsiteRepository implements IWebsiteRepository {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>,
  ) {}

  async create(website: WebsiteEntity): Promise<WebsiteEntity> {
    const document = WebsiteMapper.toDocument(website);
    const created = await this.websiteModel.create(document);
    console.log(website);
    console.log(created);
    return WebsiteMapper.toEntity(created);
  }

  update(website: WebsiteEntity): Promise<WebsiteEntity> {
    throw new Error('Method not implemented.');
  }
}
