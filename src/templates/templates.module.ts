import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, templateSchema } from './infra/schemas/templates.schema';
import { TemplateSeeder } from './infra/seeds/run-templates.seed';

@Module({
  providers: [TemplateSeeder],
  imports: [
    MongooseModule.forFeature([
      {
        name: Template.name,
        schema: templateSchema,
      },
    ]),
  ],
})
export class TemplatesModule {}
