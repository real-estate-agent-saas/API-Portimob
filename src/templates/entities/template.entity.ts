export type TemplateFieldType =
  | 'string'
  | 'text'
  | 'image'
  | 'color'
  | 'link'
  | 'boolean'
  | 'number';

export interface TemplateField {
  key: string; // "bannerText"
  label: string; // "Text from banner"
  type: TemplateFieldType; // "string" | "color" | ...
  defaultValue?: any; // "#0055ff" | "Bem-vindo"
  editable: boolean; // User can Edit
  helpText?: string; // Hints text
  required?: boolean; // Valitadion
  group?: string; // ex.: "Hero", "Footer"
}

export class TemplateEntity {
  readonly id?: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly previewImage: string;
  readonly fields: TemplateField[];
  readonly version: number;
  readonly isActive: boolean;

  constructor(props: Omit<TemplateEntity, 'id'>) {
    Object.assign(this, props);
  }
}
