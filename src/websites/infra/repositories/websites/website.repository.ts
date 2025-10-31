import { IWebsiteRepository } from './Iwebsite.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { Website, WebsiteDocument } from '../../schemas/websites.schema';
import { WebsiteMapper } from '../../mappers/website.mapper';

export class WebsiteRepository implements IWebsiteRepository {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>,
  ) {}

  async create(website: WebsiteEntity): Promise<WebsiteEntity> {
    const created = await this.websiteModel.create(
      WebsiteMapper.toDocument(website),
    );
    return WebsiteMapper.toEntity(created);
  }

  async findOneBySlug(slug: string): Promise<WebsiteEntity | null> {
    const website = await this.websiteModel.findOne({ slug }).lean();
    if (!website) return null;
    return WebsiteMapper.toEntity(website);
  }

  async update(website: WebsiteEntity): Promise<WebsiteEntity | null> {
    const websiteDoc = WebsiteMapper.toDocument(website);
    const updated = await this.websiteModel.findByIdAndUpdate(
      website.id,
      websiteDoc,
      { new: true },
    );
    if (!updated) return null;
    return WebsiteMapper.toEntity(updated);
  }

  async findOneByUserId(userId: string): Promise<WebsiteEntity | null> {
    const objectId = new Types.ObjectId(userId);
    const website = await this.websiteModel
      .findOne({ userId: objectId })
      .lean();
    if (!website) return null;
    console.log(website);
    return WebsiteMapper.toEntity(website);
  }
}
