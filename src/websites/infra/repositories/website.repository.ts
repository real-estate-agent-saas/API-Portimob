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
    return WebsiteMapper.toEntity(created);
  }

  async update(website: WebsiteEntity): Promise<WebsiteEntity | null> {
    const document = WebsiteMapper.toDocument(website);
    const updated = await this.websiteModel.findByIdAndUpdate(
      website.id,
      document,
      { new: true },
    );
    if (!updated) return null;
    return WebsiteMapper.toEntity(updated);
  }

  async findByUserId(userId: string): Promise<WebsiteEntity | null> {
    const website = await this.websiteModel.findOne({ userId });
    if(!website) return null;
    return WebsiteMapper.toEntity(website);
  }
}
