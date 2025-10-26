export interface WebsiteProps {
  readonly id?: string;
  readonly templateConfigId: string;
  readonly userId: string;
  template: { name: string; id: string };

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
  readonly templateConfigId: string;
  readonly userId: string;
  template: { name: string; id: string };

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
    const {
      template,
      websiteName,
      logoURL,
      slug,
      customDomain,
      realtorName,
      publicEmail,
      whatsapp,
      phone,
      instagram,
      facebook,
      linkedin,
      profileImage,
      bio,
      careerStartDate,
      creci,
      gender,
      specialties,
      templateConfigId,
      userId,
      id,
    } = props;

    //insertions
    this.id = id;
    this.templateConfigId = templateConfigId;
    this.userId = userId;
    this.template = template;
    this.websiteName = websiteName;
    this.logoURL = logoURL;
    this.slug = slug;
    this.customDomain = customDomain;
    this.realtorName = realtorName;
    this.publicEmail = publicEmail;
    this.whatsapp = whatsapp;
    this.phone = phone;
    this.instagram = instagram;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.profileImage = profileImage;
    this.bio = bio;
    this.careerStartDate = careerStartDate;
    this.creci = creci;
    this.gender = gender;
    this.specialties = specialties;
  }

  static create(props: WebsiteProps): WebsiteEntity {
    return new WebsiteEntity(props);
  }
  
}
