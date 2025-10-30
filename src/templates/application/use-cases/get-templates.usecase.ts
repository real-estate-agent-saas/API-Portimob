import { Inject, Injectable } from '@nestjs/common';
import { TemplateEntity } from 'src/templates/entities/template.entity';
import type { ITemplatesRepository } from 'src/templates/infra/repositories/Itemplates.repository';
import { TemplatePresenter } from '../presenters/template.presenter';

@Injectable()
export class GetTemplatesUseCase {
  constructor(
    @Inject('ITemplatesRepository')
    private readonly templatesRepository: ITemplatesRepository,
  ) {}

  async execute(): Promise<TemplatePresenter[]> {
    const templates = await this.templatesRepository.getAllTemplates();
    return templates.map((template) => TemplatePresenter.fromEntity(template));
  }
}
