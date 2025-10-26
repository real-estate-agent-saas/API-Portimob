import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplatesConfigService } from './templates-config.service';
import { CreateTemplateConfigDto } from './dto/create-templates-config.dto';
import { UpdateTemplateConfigDto } from './dto/update-templates-config.dto';
import { CreateTemplateConfigUseCase } from './application/use-cases/create-template-config.usecase';

@Controller('templates-config')
export class TemplatesConfigController {
  constructor(
    private readonly templatesConfigService: TemplatesConfigService,
    private readonly createTemplateConfigUseCase: CreateTemplateConfigUseCase,
  ) {}

  @Post()
  create(@Body() createTemplatesConfigDto: CreateTemplateConfigDto) {
    return this.createTemplateConfigUseCase.execute(createTemplatesConfigDto);
  }

  @Get()
  findAll() {
    return this.templatesConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesConfigService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplatesConfigDto: UpdateTemplateConfigDto,
  ) {
    return this.templatesConfigService.update(+id, updateTemplatesConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesConfigService.remove(+id);
  }
}
