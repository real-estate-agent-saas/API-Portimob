import { Module } from '@nestjs/common';
import { TenantWebsitesController } from './tenant-websites.controller';
import { GetTenantWebsiteUseCase } from './application/use-cases/get-tenant-website.usecase';
import { WebsitesInfraModule } from '../infra/websites-infra.module';

@Module({
  imports: [WebsitesInfraModule],
  controllers: [TenantWebsitesController],
  providers: [GetTenantWebsiteUseCase],
})
export class TenantWebsitesModule {}
