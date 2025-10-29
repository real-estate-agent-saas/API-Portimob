import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetWebsiteUseCase } from '../application/use-cases/tenant-websites/get-website.usecase';
import { SlugParamDto } from '../dto/slug-param.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('websites/tenant')
export class TenantWebsitesController {
  constructor(private readonly getWebsiteUseCase: GetWebsiteUseCase) {}

  @IsPublic()
  @Get('get-website/:slug')
  getWebsiteBySlug(@Param() params: SlugParamDto) {
    return this.getWebsiteUseCase.execute(params.slug);
  }
}
