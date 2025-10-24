import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { CreateWebsiteUseCase } from './application/use-cases/create-website.usecase';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('websites')
export class WebsitesController {
  constructor(
    private readonly websitesService: WebsitesService,
    private readonly createWebsiteUseCase: CreateWebsiteUseCase,
  ) {}

  @IsPublic()
  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.createWebsiteUseCase.execute(createWebsiteDto);
  }

  @Get()
  findAll() {
    return this.websitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websitesService.update(+id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.websitesService.remove(+id);
  }
}
