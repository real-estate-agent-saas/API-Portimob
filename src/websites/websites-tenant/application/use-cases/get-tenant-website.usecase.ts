import { Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/slug-validator';
import { WebsiteTenantPresenter } from '../presenters/website-tenant.presenter';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class GetTenantWebsiteUseCase {
  constructor(private readonly websitesHelper: WebsitesHelper) {}

  async execute(slug: string): Promise<WebsiteTenantPresenter | null> {
    const validSlug = SlugValidatorService.normalize(slug);
    const website = await this.websitesHelper.findOneBySlug(validSlug);
    if (website) return WebsiteTenantPresenter.fromEntity(website);
    return null;
  }
}
