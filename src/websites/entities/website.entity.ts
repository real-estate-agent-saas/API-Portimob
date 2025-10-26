export interface WebsiteProps {
  readonly id?: string;
  readonly userId: string;
  readonly templateConfigId?: string;
  template?: { name: string; id: string };

  //website data
  websiteName?: string;
  slug?: string;
  customDomain?: string;
  logoURL?: string;

  //realtor data
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

export class WebsiteEntity {
  //relationship data
  readonly id?: string;
  readonly userId: string;
  readonly templateConfigId?: string;
  template?: { name: string; id: string };

  //website data
  websiteName?: string;
  slug?: string;
  customDomain?: string;
  logoURL?: string;

  //realtor data
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

  private constructor(props: WebsiteProps) {
    Object.assign(this, props);
  }

  static create(props: WebsiteProps): WebsiteEntity {
    return new WebsiteEntity(props);
  }

  update(data: Partial<WebsiteProps>) {
    Object.assign(this, data);
  }
}
