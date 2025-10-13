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

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
  ) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.createPropertyUseCase.execute(createPropertyDto);
  }
  
}