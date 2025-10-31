import { SlugValidatorService } from '../domain/slug-validator';
import { InvalidWebsiteError } from '../errors/invalid-website.error';
import { Gender } from './value-objects/gender.vo';
import { Specialty } from './value-objects/specialty.vo';


export interface WebsiteProps {
  readonly id?: string;
  readonly userId: string;

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
  gender?: Gender;
  specialties?: Specialty[];
}

export class WebsiteEntity {
  //relationship data
  readonly id?: string;
  readonly userId: string;
  private templateConfigId: string;
  private templateCode: string;

  //website data
  websiteName?: string;
  customDomain?: string;
  private slug?: string;
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
  gender?: Gender;
  specialties?: Specialty[];

  private constructor(props: WebsiteProps) {
    Object.assign(this, props);
  }

  // ------------------------------------------ FACTORY METHODS ----------------------------------------
  static create(
    props: WebsiteProps,
    templateCode?: string,
    templateConfigId?: string,
  ): WebsiteEntity {
    const website = new WebsiteEntity(props);
    if (templateCode && templateConfigId) {
      website.setTemplate(templateCode, templateConfigId);
    }
    return website;
  }

  // ---------------------------------------- TEMPLATE ------------------------------------------

  setTemplate(templateCode: string, templateConfigId: string): void {
    if (!templateCode?.trim()) {
      throw new InvalidWebsiteError('O código do template é obrigatório.', {
        templateCode,
      });
    }

    if (!templateConfigId?.trim()) {
      throw new InvalidWebsiteError(
        'O ID da configuração do template é obrigatório.',
        { templateConfigId },
      );
    }

    if (templateCode === this.templateCode) {
      throw new InvalidWebsiteError('O website já está usando esse template.', {
        currentTemplateCode: this.templateCode,
        attemptedTemplateCode: templateCode,
      });
    }

    this.templateCode = templateCode;
    this.templateConfigId = templateConfigId;
  }

  getTemplateCode(): string {
    return this.templateCode;
  }

  getTemplateConfigId(): string {
    return this.templateConfigId;
  }

  // ---------------------------------------- SLUG ------------------------------------------

  setSlug(slug: string): void {
    SlugValidatorService.normalizeAndValidate(slug);
    this.slug = slug;
  }

  getSlug(): string | undefined {
    return this.slug;
  }

  update(data: Partial<WebsiteProps>) {
    Object.assign(this, data);
  }
}
