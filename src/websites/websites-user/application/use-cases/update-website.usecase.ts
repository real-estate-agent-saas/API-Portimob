import { Inject, Injectable } from '@nestjs/common';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';
import { UpdateWebsiteDto } from '../../dtos/update-website.dto';

@Injectable()
export class UpdateWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(
    userId: string,
    updateWebsiteDto: UpdateWebsiteDto,
  ): Promise<WebsiteEntity | null> {
    const website = await this.websiteRepository.findOneByUserId(userId);
    if (!website) throw new Error('Website não encontrado');
    website.update(updateWebsiteDto);
    const updatedWebsite = await this.websiteRepository.update(website);
    if (!updatedWebsite) throw new Error('Erro ao atualizar o website');
    return updatedWebsite;
  }
}
