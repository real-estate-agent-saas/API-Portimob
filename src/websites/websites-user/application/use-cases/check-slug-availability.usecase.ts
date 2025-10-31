import { Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/slug-validator';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';

@Injectable()
export class CheckSlugAvailabilityUseCase {
  constructor(
    private readonly websitesHelper: WebsitesHelper,
  ) {}

  async execute(slug: string): Promise<boolean> {
    const validSlug = SlugValidatorService.normalizeAndValidate(slug);
    return this.websitesHelper.checkSlugAvailability(validSlug);
  }
}
