import { Gender } from 'src/websites/entities/value-objects/gender.vo';
import { Specialty } from 'src/websites/entities/value-objects/specialty.vo';
import { WebsiteEntity } from 'src/websites/entities/website.entity';

export class WebsiteUserPresenter {
  readonly realtorName?: string;
  readonly publicEmail?: string;
  readonly whatsapp?: string;
  readonly phone?: string;
  readonly instagram?: string;
  readonly facebook?: string;
  readonly linkedin?: string;
  readonly profileImage?: string;
  readonly bio?: string;
  readonly careerStartDate?: string | null;
  readonly creci?: string;
  readonly gender?: Gender;
  readonly templateCode?: string;
  readonly templateConfigId?: string;
  readonly specialties?: Specialty[];

  constructor(props: WebsiteUserPresenter) {
    Object.assign(this, props);
  }

  static fromEntity(entity: WebsiteEntity) {
    return new WebsiteUserPresenter({
      realtorName: entity.realtorName,
      publicEmail: entity.publicEmail,
      whatsapp: entity.whatsapp,
      phone: entity.phone,
      instagram: entity.instagram,
      facebook: entity.facebook,
      linkedin: entity.linkedin,
      profileImage: entity.profileImage,
      bio: entity.bio,
      careerStartDate: entity.careerStartDate
        ? entity.careerStartDate.toISOString()
        : undefined,
      creci: entity.creci,
      gender: entity.gender,
      templateCode: entity.getTemplateCode(),
      templateConfigId: entity.getTemplateConfigId(),
      specialties: entity.specialties,
    });
  }
}
