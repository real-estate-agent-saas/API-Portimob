import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/website/Iwebsite.repository';
import type { ITemplatesRepository } from 'src/templates/infra/repositories/Itemplates.repository';

@Injectable()
export class ChangeTemplateUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
    @Inject('ITemplatesRepository')
    private readonly templateRepository: ITemplatesRepository,
  ) {}

  async execute(userId: string, templateCode: string): Promise<boolean> {
    const template = await this.templateRepository.findByCode(templateCode);
    if (!template) {
      throw new Error('Template não encontrado');
    }
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website) {
      throw new Error('Website não encontrado');
    }
    website.update({ templateCode: template.templateCode });
    const updatedWebsite = await this.websiteRepository.update(website);
    if (!updatedWebsite) {
      throw new Error('Erro ao atualizar o template do website');
    }
    return true;
  }
}
