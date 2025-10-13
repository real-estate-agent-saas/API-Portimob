import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { FindAllPropertiesUseCase } from './application/use-cases/find-all-properties.usecase';
import { FindOnePropertyUseCase } from './application/use-cases/find-one-property.usecase';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly findAllPropertiesUseCase: FindAllPropertiesUseCase,
    private readonly findOnePropertyUseCase: FindOnePropertyUseCase,
  ) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.createPropertyUseCase.execute(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.findAllPropertiesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOnePropertyUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
