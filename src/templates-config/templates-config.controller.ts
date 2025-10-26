import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplatesConfigService } from './templates-config.service';
import { CreateTemplatesConfigDto } from './dto/create-templates-config.dto';
import { UpdateTemplatesConfigDto } from './dto/update-templates-config.dto';

@Controller('templates-config')
export class TemplatesConfigController {
  constructor(private readonly templatesConfigService: TemplatesConfigService) {}

  @Post()
  create(@Body() createTemplatesConfigDto: CreateTemplatesConfigDto) {
    return this.templatesConfigService.create(createTemplatesConfigDto);
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
  update(@Param('id') id: string, @Body() updateTemplatesConfigDto: UpdateTemplatesConfigDto) {
    return this.templatesConfigService.update(+id, updateTemplatesConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesConfigService.remove(+id);
  }
}
