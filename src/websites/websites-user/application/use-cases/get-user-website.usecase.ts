import { Injectable } from '@nestjs/common';
import { WebsiteUserPresenter } from '../presenters/website-user.presenter';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class GetUserWebsiteUseCase {
  constructor(private readonly websitesHelper: WebsitesHelper) {}

  async execute(userId: string) {
    const website = await this.websitesHelper.findOneByUserId(userId);
    return WebsiteUserPresenter.fromEntity(website);
  }
}
