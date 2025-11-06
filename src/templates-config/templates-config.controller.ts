import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTemplateConfigDto } from './dto/create-templates-config.dto';
import { CreateTemplateConfigUseCase } from './application/use-cases/create-template-config.usecase';

@Controller('templates-config')
export class TemplatesConfigController {
  constructor(
    private readonly createTemplateConfigUseCase: CreateTemplateConfigUseCase,
  ) {}

  @Post()
  create(@Body() createTemplatesConfigDto: CreateTemplateConfigDto) {
    return this.createTemplateConfigUseCase.execute(createTemplatesConfigDto);
  }

}
