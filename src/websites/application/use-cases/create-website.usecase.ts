import { Inject, Injectable } from '@nestjs/common';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import type { IWebsiteRepository } from 'src/websites/repositories/Iwebsite.repository';

@Injectable()
export class CreateWebsiteUseCase {
  constructor(
    @Inject('IWebsiteRepository')
    private readonly websiteRepository: IWebsiteRepository,
  ) {}

  async execute(createWebsiteDto): Promise<any> {
    
    return createWebsiteDto;
  }
}