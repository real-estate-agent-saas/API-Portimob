import { Module } from '@nestjs/common';
import { TemplatesConfigController } from './templates-config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TemplatesConfig,
  templatesConfigSchema,
} from './infra/schemas/templates-config.schema';
import { CreateTemplateConfigUseCase } from './application/use-cases/create-template-config.usecase';
import { TemplatesConfigRepository } from './infra/repositories/templatesConfig.repository';
import { TemplatesModule } from 'src/templates/templates.module';
import { TemplatesConfigHelper } from './infra/helpers/templates-config.helper';

@Module({
  controllers: [TemplatesConfigController],
  providers: [
    TemplatesConfigHelper,
    CreateTemplateConfigUseCase,
    {
      provide: 'ITemplatesConfigRepository',
      useClass: TemplatesConfigRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: TemplatesConfig.name,
        schema: templatesConfigSchema,
      },
    ]),
    TemplatesModule,
  ],
  exports: ['ITemplatesConfigRepository', TemplatesConfigHelper, MongooseModule],
})
export class TemplatesConfigModule {}
