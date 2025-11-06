import { Injectable } from '@nestjs/common';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { UpdateWebsiteDto } from '../../dtos/update-website.dto';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class UpdateWebsiteUseCase {
  constructor(private readonly websitesHelper: WebsitesHelper) {}

  async execute(
    userId: string,
    updateWebsiteDto: UpdateWebsiteDto,
  ): Promise<WebsiteEntity | null> {
    const website = await this.websitesHelper.findOneByUserId(userId);
    website.update(updateWebsiteDto);
    return this.websitesHelper.update(website);
  }
}
