import { Inject, Injectable } from '@nestjs/common';
import { SlugValidatorService } from 'src/websites/domain/services/slug-validator.service';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';

@Injectable()
export class UpdateSlugUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(userId: string, slug: string): Promise<string> {
    const validSlug = SlugValidatorService.normalizeAndValidate(slug);
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website) throw new Error('Website não encontrado');
    website.update({ slug: validSlug });
    const updatedWebsite = await this.websiteRepository.update(website);
    if (!updatedWebsite?.slug) throw new Error('Erro ao atualizar o slug do website');
    return updatedWebsite.slug;
  }
}
