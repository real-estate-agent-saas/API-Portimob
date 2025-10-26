import { InjectModel } from '@nestjs/mongoose';
import { Template } from '../schemas/templates.schema';
import { Model } from 'mongoose';
import { SEED_TEMPLATES } from './templates.seed';
import { OnModuleInit, Logger } from '@nestjs/common';

export class TemplateSeeder implements OnModuleInit {
  constructor(
    @InjectModel(Template.name) private readonly model: Model<Template>,
  ) {}

  private readonly logger = new Logger(TemplateSeeder.name);

  async onModuleInit() {
    for (const t of SEED_TEMPLATES) {
      const existing = await this.model.findOne({ code: t.code }).exec();
      if (existing) continue;
      await this.model.create(t);
    }

    this.logger.log('TemplatesSeeder executed Successfully');
  }
}
