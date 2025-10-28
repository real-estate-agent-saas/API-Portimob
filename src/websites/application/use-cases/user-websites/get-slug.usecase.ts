import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';

@Injectable()
export class GetSlugUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(userId: string): Promise<string> {
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website || !website.slug) return "";
    return website.slug;
  }
}
