import { Inject, Injectable } from '@nestjs/common';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';

@Injectable()
export class UpdateSlugUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(userId: string, slug: string): Promise<string> {
    const website = await this.websitesHelper.findOneByUserId(userId);
    website.setSlug(slug);
    const updatedWebsite = await this.websitesHelper.update(website);
    return updatedWebsite.getSlug()!;
  }
}
