import { Inject, Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from 'src/websites/dto/create-website.dto';
import { WebsiteEntity } from 'src/websites/entities/website.entity';
import type { IWebsiteRepository } from 'src/websites/repositories/Iwebsite.repository';

@Injectable()
export class CreateWebsiteUseCase {
  constructor() {}

  async execute(createWebsiteDto: CreateWebsiteDto): Promise<WebsiteEntity> {
    return createWebsiteDto;
  }
}
