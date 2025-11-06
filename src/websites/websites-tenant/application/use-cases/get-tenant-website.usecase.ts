import { Inject, Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/slug-validator';
import { WebsiteTenantPresenter } from '../presenters/website-tenant.presenter';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';

@Injectable()
export class GetTenantWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(slug: string): Promise<WebsiteTenantPresenter | null> {
    const validSlug = SlugValidatorService.normalize(slug);
    const result = await this.websiteRepository.findOneBySlug(validSlug);

    if (!result) {
      return null;
    }
    
    const { website, templateConfig } = result;

    return WebsiteTenantPresenter.fromEntity(website, templateConfig);
  }
}
