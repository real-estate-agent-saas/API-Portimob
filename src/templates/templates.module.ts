import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, templateSchema } from './infra/schemas/templates.schema';
import { TemplateSeeder } from './infra/seeds/run-templates.seed';
import { TemplatesRepository } from './infra/repositories/templates.repository';
import { TemplatesController } from './templates.controller';
import { GetTemplatesUseCase } from './application/use-cases/get-templates.usecase';
import { TemplatesHelper } from './infra/helpers/templates.helper';

@Module({
  providers: [
    TemplateSeeder,
    GetTemplatesUseCase,
    TemplatesHelper,
    {
      provide: 'ITemplatesRepository',
      useClass: TemplatesRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Template.name,
        schema: templateSchema,
      },
    ]),
  ],
  exports: ['ITemplatesRepository', TemplatesHelper],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
