import { Inject, Injectable } from '@nestjs/common';
import { TemplateEntity } from 'src/templates/entities/template.entity';
import { TemplateNotFoundError } from 'src/templates/errors/template-not-found.error';
import type { ITemplatesRepository } from '../repositories/Itemplates.repository';

@Injectable()
export class TemplatesHelper {
  constructor(
    @Inject('ITemplatesRepository')
    private readonly templateRepository: ITemplatesRepository,
  ) {}

  async ensureTemplateExisits(templateCode: string): Promise<string> {
    const template = await this.findTemplateByCode(templateCode);
    return template.templateCode;
  }

  async findTemplateByCode(templateCode: string): Promise<TemplateEntity> {
    const template = await this.templateRepository.findByCode(templateCode);
    if (!template) {
      throw new TemplateNotFoundError({ templateCode });
    } else {
      return template;
    }
  }
}
