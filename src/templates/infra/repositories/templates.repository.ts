import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from '../schemas/templates.schema';
import { Model } from 'mongoose';
import { ITemplatesRepository } from './Itemplates.repository';
import { Injectable } from '@nestjs/common';
import { TemplateEntity } from 'src/templates/entities/template.entity';
import { TemplateMapper } from '../mappers/template.mapper';

@Injectable()
export class TemplatesRepository implements ITemplatesRepository {
  constructor(
    @InjectModel(Template.name)
    private readonly templateRepository: Model<TemplateDocument>,
  ) {}

  async getAllTemplates(): Promise<TemplateEntity[]> {
    const templates = await this.templateRepository.find().lean().exec();
    return templates.map((doc) => TemplateMapper.toEntity(doc));
  }

  async findByCode(templateCode: string): Promise<TemplateEntity | null> {
    const template = await this.templateRepository.findOne({ templateCode }).lean();
    if (!template) return null;
    const templateEntity = TemplateMapper.toEntity(template);
    return templateEntity;
  }
}
