import { Inject, Injectable } from '@nestjs/common';
import { CreateTemplateConfigDto } from 'src/templates-config/dto/create-templates-config.dto';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import type { ITemplatesConfigRepository } from 'src/templates-config/infra/repositories/ItemplatesConfig.repository';
import type { ITemplatesRepository } from 'src/templates/infra/repositories/Itemplates.repository';

@Injectable()
export class CreateTemplateConfigUseCase {
  constructor(
    @Inject('ITemplatesConfigRepository')
    private readonly templatesConfigRepository: ITemplatesConfigRepository,
    @Inject('ITemplatesRepository')
    private readonly templatesRepository: ITemplatesRepository,
  ) {}

  async execute(dto: CreateTemplateConfigDto) {
    const template = await this.templatesRepository.findByCode(
      dto.templateCode,
    );

    if (!template) throw new Error('Nenhum template com esse código');

    const templateConfigEntity = TemplateConfigEntity.create({
      templateCode: dto.templateCode,
      userId: dto.userId,
      websiteId: dto.websiteId,
      values: {},
    });

    const createdTemplateConfig =
      await this.templatesConfigRepository.create(templateConfigEntity);
  }
}
