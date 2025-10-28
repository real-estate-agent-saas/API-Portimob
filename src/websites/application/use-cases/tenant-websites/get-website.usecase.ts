import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';
import { WebsitePresenter } from '../../presenters/user-websites/website.presenter';
import { SlugValidatorService } from 'src/websites/domain/services/slug-validator.service';

@Injectable()
export class GetWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(slug: string): Promise<WebsitePresenter> {
    const validSlug = SlugValidatorService.normalize(slug);
    const website = await this.websiteRepository.findBySlug(validSlug);
    if (!website) return {};
    return WebsitePresenter.fromEntity(website);
  }
}
