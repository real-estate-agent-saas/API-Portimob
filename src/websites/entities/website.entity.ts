interface WebsiteProps{
  //relationship data
  template: { name: string; id: string };

  //website data
  websiteName?: string;
  logoURL?: string;
  slug?: string;
  customDomain?: string;

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
  logoURL?: string;
  slug?: string;
  customDomain?: string;

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

  /*substituímos o Omit por isso aqui?*/
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
    } = props;

    //insertions
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
}

/*let peniz = new WebsiteEntity(
    'classico',
    'corretor1',
    {name: 'ricardo', id: '1234'},
    {}
);*/
