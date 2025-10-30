import { Inject, Injectable } from '@nestjs/common';
import type { IWebsiteRepository } from 'src/websites/infra/repositories/websites/Iwebsite.repository';

@Injectable()
export class UpdateProfileImageUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(
    userId: string,
    profileImage: string,
  ): Promise<string | null> {
    const website = await this.websiteRepository.findByUserId(userId);
    if (!website) throw new Error('Website não encontrado');
    website.update({ profileImage: profileImage });
    const updatedWebsite = await this.websiteRepository.update(website);
    if (!updatedWebsite?.profileImage) throw new Error('Erro ao atualizar imagem de perfil');
    return updatedWebsite.profileImage;
  }
}
