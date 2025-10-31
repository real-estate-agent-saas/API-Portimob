import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';
import { SlugValidatorService } from 'src/websites/domain/slug-validator';
import { WebsiteTenantPresenter } from '../presenters/website-tenant.presenter';

@Injectable()
export class GetTenantWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(slug: string): Promise<WebsiteTenantPresenter | null> {
    const validSlug = SlugValidatorService.normalize(slug);
    const website = await this.websiteRepository.findOneBySlug(validSlug);
    if (!website) return null;
    return WebsiteTenantPresenter.fromEntity(website);
  }
}
