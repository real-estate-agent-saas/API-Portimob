import { Injectable } from '@nestjs/common';
import { CreateTemplatesConfigDto } from './dto/create-templates-config.dto';
import { UpdateTemplatesConfigDto } from './dto/update-templates-config.dto';

@Injectable()
export class TemplatesConfigService {
  create(createTemplatesConfigDto: CreateTemplatesConfigDto) {
    return 'This action adds a new templatesConfig';
  }

  findAll() {
    return `This action returns all templatesConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} templatesConfig`;
  }

  update(id: number, updateTemplatesConfigDto: UpdateTemplatesConfigDto) {
    return `This action updates a #${id} templatesConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} templatesConfig`;
  }
}
