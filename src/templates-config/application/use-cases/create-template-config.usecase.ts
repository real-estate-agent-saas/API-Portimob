import { Injectable } from '@nestjs/common';
import { TemplateConfigGenerator } from 'src/templates-config/domain/template-config-generator';
import { CreateTemplateConfigDto } from 'src/templates-config/dto/create-templates-config.dto';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import { TemplatesConfigHelper } from 'src/templates-config/infra/helpers/templates-config.helper';
import { TemplatesHelper } from 'src/templates/infra/helpers/templates.helper';

@Injectable()
export class CreateTemplateConfigUseCase {
  constructor(
    private readonly templatesConfigHelper: TemplatesConfigHelper,
    private readonly templatesHelper: TemplatesHelper,
  ) {}

  async execute(dto: CreateTemplateConfigDto): Promise<TemplateConfigEntity> {
    // Finds the template to generate the config from
    const template = await this.templatesHelper.findTemplateByCode(
      dto.templateCode,
    );

    // Generates the template config values based on the template structure
    const templateConfigValues: Record<string, any> =
      TemplateConfigGenerator.generateTemplateConfig(template);

    // Creates the TemplateConfig entity
    const templateConfigEntity = TemplateConfigEntity.create({
      templateCode: template.templateCode,
      userId: dto.userId,
      websiteId: dto.websiteId,
      values: templateConfigValues,
    });

    const createdTemplateConfig =
      await this.templatesConfigHelper.createTemplateConfig(
        templateConfigEntity,
      );
    return createdTemplateConfig;
  }
}
