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

export interface TemplateProps {
  id?: string;
  templateCode: string;
  name: string;
  description: string;
  plan: string;
  features: string[];
  previewImage: string;
  fields: TemplateField[];
  version: number;
}

export class TemplateEntity {
  readonly id?: string;
  readonly templateCode: string;
  readonly name: string;
  readonly description: string;
  readonly previewImage: string;
  readonly fields: TemplateField[];
  readonly plan: string;
  readonly features: string[];
  readonly version: number;
  readonly isActive: boolean;

  private constructor(props: TemplateProps) {
    this.id = props.id;
    this.templateCode = props.templateCode;
    this.name = props.name;
    this.description = props.name;
    this.previewImage = props.previewImage;
    this.fields = props.fields;
    this.version = props.version;
    this.plan = props.plan;
    this.features = props.features;
    this.isActive = true;
  }

  static create(props: TemplateProps): TemplateEntity {
    return new TemplateEntity(props);
  }
}
