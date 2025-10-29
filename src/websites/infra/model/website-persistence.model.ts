import { Gender } from "src/websites/entities/value-objects/gender.vo";
import { Specialty } from "../schemas/specialties.schema";

export interface WebsitePersistenceModel {
  templateConfigId: string;
  userId: string;
  templateCode?: string;
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
  gender?: Gender;
  specialties?: Specialty[];
}
