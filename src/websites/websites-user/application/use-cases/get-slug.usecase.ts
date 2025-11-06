import { Injectable } from '@nestjs/common';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class GetSlugUseCase {
  constructor(
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(userId: string): Promise<string> {
    const website = await this.websitesHelper.findOneByUserId(userId);
    return website.getSlug() || '';
  }
}
