import { Injectable } from '@nestjs/common';
import { CreateTemplateConfigDto } from './dto/create-templates-config.dto';
import { UpdateTemplateConfigDto } from './dto/update-templates-config.dto';

@Injectable()
export class TemplatesConfigService {
  create(createTemplatesConfigDto: CreateTemplateConfigDto) {
    return 'This action adds a new templatesConfig';
  }

  findAll() {
    return `This action returns all templatesConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} templatesConfig`;
  }

  update(id: number, updateTemplatesConfigDto: UpdateTemplateConfigDto) {
    return `This action updates a #${id} templatesConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} templatesConfig`;
  }
}
