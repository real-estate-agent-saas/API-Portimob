import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { FindAllPropertiesUseCase } from './application/use-cases/find-all-properties.usecase';
import { FindOnePropertyUseCase } from './application/use-cases/find-one-property.usecase';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.usecase';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.usecase';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly findAllPropertiesUseCase: FindAllPropertiesUseCase,
    private readonly findOnePropertyUseCase: FindOnePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
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
    return this.updatePropertyUseCase.execute(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletePropertyUseCase.execute(id);
  }
}
