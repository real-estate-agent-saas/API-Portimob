import { Inject, Injectable } from '@nestjs/common';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/Iwebsite.repository';
import { WebsitePresenter } from '../../presenters/user-websites/website.presenter';

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
