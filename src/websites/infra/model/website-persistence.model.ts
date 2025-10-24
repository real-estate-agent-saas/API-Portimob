export interface WebsitePersistenceModel {
  templateConfigId: string;
  userId: string;
  template: {
    id: string;
    name: string;
  };
  websiteName?: string;
  slug?: string;
  customDomain?: string;
  logoURL?: string;
  realtorName?: string;
  publicEmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  profileImage?: string;
  bio?: string;
  careerStartDate?: Date;
  creci?: string;
  gender?: string;
  specialties?: string[];
}
