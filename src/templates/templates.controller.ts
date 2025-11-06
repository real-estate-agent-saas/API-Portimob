import { Controller, Get } from '@nestjs/common';
import { GetTemplatesUseCase } from './application/use-cases/get-templates.usecase';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly getTemplatesUseCase: GetTemplatesUseCase) {}

  @Get()
  getTemplates() {
    return this.getTemplatesUseCase.execute();
  }
}
