import { Inject, Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/slug-validator';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';
import { WebsiteUserPresenter } from '../presenters/website-user.presenter';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class CheckSlugAvailabilityUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(slug: string): Promise<boolean> {
    const validSlug = SlugValidatorService.normalizeAndValidate(slug);
    const isAvailable =
      await this.websitesHelper.checkSlugAvailability(validSlug);
    return isAvailable;
  }
}
