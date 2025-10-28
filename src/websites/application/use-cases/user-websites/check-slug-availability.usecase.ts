import { Inject, Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/services/slug-validator.service';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';

@Injectable()
export class CheckSlugAvailabilityUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(slug: string): Promise<boolean> {
    const validSlug = SlugValidatorService.normalizeAndValidate(slug);
    const website = await this.websiteRepository.findBySlug(validSlug);
    let isAvailable: boolean;
    if (!website) {
      return (isAvailable = true);
    } else {
      return (isAvailable = false);
    }
  }
}
