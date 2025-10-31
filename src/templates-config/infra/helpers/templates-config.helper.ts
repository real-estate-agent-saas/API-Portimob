import { Inject, Injectable } from '@nestjs/common';
import { WebsiteNotFoundError } from 'src/websites/errors/not-found-website.error';
import type { ITemplatesConfigRepository } from '../repositories/ItemplatesConfig.repository';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import { TemplateConfigCreateError } from 'src/templates-config/errors/create-template-config.error';

@Injectable()
export class TemplatesConfigHelper {
  constructor(
    @Inject('ITemplatesConfigRepository')
    private readonly templateConfigRepository: ITemplatesConfigRepository,
  ) {}

  async createTemplateConfig(
    templateConfig: TemplateConfigEntity,
  ): Promise<TemplateConfigEntity> {
    const createdTemplateConfig =
      await this.templateConfigRepository.create(templateConfig);
    if (!createdTemplateConfig) {
      throw new TemplateConfigCreateError({ templateConfig });
    } else {
      return createdTemplateConfig;
    }
  }
}
