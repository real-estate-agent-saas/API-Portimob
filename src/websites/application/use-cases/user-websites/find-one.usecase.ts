import { Inject, Injectable } from '@nestjs/common';
import { WebsiteUserPresenter } from '../../presenters/user-websites/website-user.presenter';
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
    return WebsiteUserPresenter.fromEntity(website);
  }
}
