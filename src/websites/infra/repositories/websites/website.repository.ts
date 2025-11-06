import { IWebsiteRepository } from './Iwebsite.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { Website, WebsiteDocument } from '../../schemas/websites.schema';
import { WebsiteMapper } from '../../mappers/website.mapper';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import {
  TemplateConfigSource,
  TemplatesConfigMapper,
} from 'src/templates-config/infra/mappers/templates-config.mapper';
import { TemplatesConfigDocument } from 'src/templates-config/infra/schemas/templates-config.schema';

export class WebsiteRepository implements IWebsiteRepository {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<WebsiteDocument>,
  ) {}

  //---------------------------------- Creates a Website. Only used when creating a new User ----------------------------------//

  async create(website: WebsiteEntity): Promise<WebsiteEntity> {
    const created = await this.websiteModel.create(
      WebsiteMapper.toDocument(website),
    );
    return WebsiteMapper.toEntity(created);
  }

  //----------------------------------- Find website by slug when accessing a tenant page ------------------------------------//
  async findOneBySlug(slug: string): Promise<{
    website: WebsiteEntity;
    templateConfig?: TemplateConfigEntity;
  } | null> {
    // Fetch website and populate template config
    const websiteDoc = await this.websiteModel
      .findOne({ slug })
      .populate('templateConfigId')
      .lean();

    // If no website found, return null
    if (!websiteDoc) return null;

    // Map website to entity
    const website = WebsiteMapper.toEntity(websiteDoc);

    // Map template config to entity if populated
    let templateConfig: TemplateConfigEntity | undefined;
    if (
      websiteDoc.templateConfigId &&
      typeof websiteDoc.templateConfigId === 'object' &&
      '_id' in websiteDoc.templateConfigId // guarantees that it came populated
    ) {
      // first cast to unknown to avoid direct ObjectId -> TemplateConfigSource conversion error
      templateConfig = TemplatesConfigMapper.toEntity(
        websiteDoc.templateConfigId as any,
      );
    }

    return { website, templateConfig };
  }

  //---------------------------------------- Updates simple fields of a Website ------------------------------------------//

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

  //----------------------------------------- Search a website based on the User ID ------------------------------------//

  async findOneByUserId(userId: string): Promise<WebsiteEntity | null> {
    const objectId = new Types.ObjectId(userId);
    const website = await this.websiteModel
      .findOne({ userId: objectId })
      .lean();
    if (!website) return null;
    return WebsiteMapper.toEntity(website);
  }
}
