import { Inject, Injectable } from '@nestjs/common';
import {
  WebsiteEntity,
  WebsiteProps,
} from 'src/websites/entities/website.entity';
import { WebsiteNotFoundError } from 'src/websites/errors/not-found-website.error';
import { WebsiteUpdateError } from 'src/websites/errors/update-website.error';
import type { IWebsiteRepository } from '../repositories/websites/Iwebsite.repository';
import { WebsiteCreateError } from 'src/websites/errors/create-website.error';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';

@Injectable()
export class WebsitesHelper {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async create(website: WebsiteEntity): Promise<WebsiteEntity> {
    const created = await this.websiteRepository.create(website);
    if (!created) throw new WebsiteCreateError({ website });
    return created;
  }

  async findOneByUserId(userId: string): Promise<WebsiteEntity> {
    const website = await this.websiteRepository.findOneByUserId(userId);
    if (!website) throw new WebsiteNotFoundError({ userId });
    return website;
  }

  async checkSlugAvailability(slug: string): Promise<boolean> {
    const website = await this.websiteRepository.findOneBySlug(slug);
    // If website is found, slug is not available
    return website ? false : true;
  }

  async update(website: WebsiteEntity): Promise<WebsiteEntity> {
    const updated = await this.websiteRepository.update(website);
    if (!updated) throw new WebsiteUpdateError({ website });
    return updated;
  }

  async findOneAndUpdate(
    userId: string,
    updateData: Partial<WebsiteProps>,
  ): Promise<WebsiteEntity> {
    const website = await this.findOneByUserId(userId);
    website.update(updateData);
    return this.update(website);
  }
}
