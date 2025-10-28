import { Inject, Injectable } from '@nestjs/common';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { WebsitePresenter } from '../../presenters/user-websites/website.presenter';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';

@Injectable()
export class FindOneWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(userId: string) {
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website) throw new Error('Website não encontrado');
    return WebsitePresenter.fromEntity(website);
  }
}
