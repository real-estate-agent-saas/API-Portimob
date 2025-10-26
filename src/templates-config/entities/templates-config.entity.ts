export interface TemplateConfigProps {
  readonly id?: string;
  templateCode: string;
  websiteId: string;
  userId: string;
  values: Record<string, any>;
}

export class TemplateConfigEntity {
  readonly id?: string;
  templateCode: string;
  websiteId: string;
  userId: string;
  values: Record<string, any>;

  private constructor(props: TemplateConfigProps) {
    Object.assign(this, props);
  }

  static create(props: TemplateConfigProps) {
    return new TemplateConfigEntity(props);
  }
}
