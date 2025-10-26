import { Module } from '@nestjs/common';
import { TemplatesConfigService } from './templates-config.service';
import { TemplatesConfigController } from './templates-config.controller';

@Module({
  controllers: [TemplatesConfigController],
  providers: [TemplatesConfigService],
})
export class TemplatesConfigModule {}
