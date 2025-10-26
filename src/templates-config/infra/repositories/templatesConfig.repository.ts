import { InjectModel } from '@nestjs/mongoose';
import {
  TemplatesConfig,
  TemplatesConfigDocument,
} from '../schemas/templates-config.schema';
import { Model } from 'mongoose';
import { ITemplatesConfigRepository } from './ItemplatesConfig.repository';
import { Injectable } from '@nestjs/common';
import { TemplateConfigEntity } from 'src/templates-config/entities/templates-config.entity';
import { TemplatesConfigMapper } from '../mappers/templates-config.mapper';

@Injectable()
export class TemplatesConfigRepository implements ITemplatesConfigRepository {
  constructor(
    @InjectModel(TemplatesConfig.name)
    private readonly templatesConfigRepository: Model<TemplatesConfigDocument>,
  ) {}

  async create(
    templateConfigEntity: TemplateConfigEntity,
  ): Promise<TemplateConfigEntity> {
    const document =
      TemplatesConfigMapper.toDocument(templateConfigEntity);
    const createdTemplateConfig =
      await this.templatesConfigRepository.create(document);
    const createdTemplateConfigEntity = TemplatesConfigMapper.toEntity(
      createdTemplateConfig,
    );
    return createdTemplateConfigEntity;
  }
}
