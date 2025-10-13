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

  constructor(
    templateConfigId: string,
    userId: string,
    template: { name: string; id: string },
    
    props?: Partial<Omit<WebsiteEntity, 'templateConfigId' | 'userId' | 'template'>>,
    ) {
    
    this.templateConfigId = templateConfigId;
    this.userId = userId;
    this.template = template;
    
    if (props) {
      Object.assign(this, props);
    }
  }
}

/*let peniz = new WebsiteEntity(
    'classico',
    'corretor1',
    {name: 'ricardo', id: '1234'},
    {}
);*/
