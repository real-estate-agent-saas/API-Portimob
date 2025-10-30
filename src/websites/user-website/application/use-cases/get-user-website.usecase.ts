import { Inject, Injectable } from '@nestjs/common';
import { WebsiteUserPresenter } from '../presenters/website-user.presenter';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';
import { WebsiteNotFoundError } from 'src/websites/errors/website-not-found.error';

@Injectable()
export class GetUserWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(userId: string) {
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website) throw new WebsiteNotFoundError({ userId });
    return WebsiteUserPresenter.fromEntity(website);
  }
}
