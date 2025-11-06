import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SlugParamDto } from './dtos/slug-param.dto';
import { GetTenantWebsiteUseCase } from './application/use-cases/get-tenant-website.usecase';

@Controller('websites/tenant')
export class TenantWebsitesController {
  constructor(private readonly getWebsiteUseCase: GetTenantWebsiteUseCase) {}

  @IsPublic()
  @Get('get-website/:slug')
  getWebsiteBySlug(@Param() params: SlugParamDto) {
    return this.getWebsiteUseCase.execute(params.slug);
  }
}
