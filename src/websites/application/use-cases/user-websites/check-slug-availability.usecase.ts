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
    const isAvailable = await this.websiteRepository.findBySlug(validSlug);
    return isAvailable;
  }
}
