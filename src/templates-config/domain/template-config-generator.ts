import { TemplateEntity } from 'src/templates/entities/template.entity';

// Based on a Template Entity gets from "fields" it's key and defaultValue as a initial config
export class TemplateConfigGenerator {
  static generateTemplateConfig(template: TemplateEntity): Record<string, any> {
    return Object.fromEntries(
      template.fields.map((f) => [f.key, f.defaultValue ?? null]),
    );
  }
}
