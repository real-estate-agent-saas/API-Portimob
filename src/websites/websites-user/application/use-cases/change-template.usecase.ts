import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';
import { WebsitesHelper } from 'src/websites/infra/helpers/websites.helper';
import { TemplatesHelper } from 'src/templates/infra/helpers/templates.helper';
import { WebsiteUserPresenter } from '../presenters/website-user.presenter';

@Injectable()
export class ChangeTemplateUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    @Inject('ITemplatesRepository')
    private readonly websitesHelper: WebsitesHelper,
    private readonly templatesHelper: TemplatesHelper,
  ) {}

  async execute(userId: string, templateCode: string) {
    const website = await this.websitesHelper.findOneByUserId(userId);
    const currentTemplateCode = website.getTemplateCode();

    if (templateCode === currentTemplateCode) {
      return null;
    }

    const template = await this.templatesHelper.ensureTemplateExisits(templateCode);
    const templateConfig = await this
    
  }
}
