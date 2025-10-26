export interface TemplateConfigPersistenceModel {
  templateCode: string;
  userId: string;
  websiteId: string;
  values: Record<string, any>;
}