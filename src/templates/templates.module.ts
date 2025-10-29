import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, templateSchema } from './infra/schemas/templates.schema';
import { TemplateSeeder } from './infra/seeds/run-templates.seed';
import { TemplatesRepository } from './infra/repositories/templates.repository';
import { TemplatesController } from './templates.controller';
import { GetTemplatesUseCase } from './application/use-cases/get-templates.usecase';

@Module({
  providers: [
    TemplateSeeder,
    GetTemplatesUseCase,
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
  exports: ['ITemplatesRepository'],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
