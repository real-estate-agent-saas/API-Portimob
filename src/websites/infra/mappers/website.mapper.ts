import { WebsiteEntity } from "src/websites/entities/website.entity";
import { WebsiteDocument } from "../schemas/websites.schema";
import { WebsitePersistenceModel } from "../model/website-persistence.model";

export class WebsiteMapper {
  static toEntity(document: WebsiteDocument): WebsiteEntity {
    return WebsiteEntity.create({
      id: document._id.toString(),
      templateConfigId: document.templateConfigId,
      userId: document.userId,
      template: document.template,
      websiteName: document.websiteName,
      slug: document.slug,
      customDomain: document.customDomain,
      logoURL: document.logoURL,
      realtorName: document.realtorName,
      publicEmail: document.publicEmail,
      whatsapp: document.whatsapp,
      phone: document.phone,
      instagram: document.instagram,
      facebook: document.facebook,
      linkedin: document.linkedin,
      profileImage: document.profileImage,
      bio: document.bio,
      careerStartDate: document.careerStartDate,
      creci: document.creci,
      gender: document.gender,
      specialties: document.specialties,
    });
  }

  static toDocument(entity: WebsiteEntity): WebsitePersistenceModel {
    return {
      templateConfigId: entity.templateConfigId!,
      userId: entity.userId,
      template: entity.template,
      websiteName: entity.websiteName,
      slug: entity.slug,
      customDomain: entity.customDomain,
      logoURL: entity.logoURL,
      realtorName: entity.realtorName,
      publicEmail: entity.publicEmail,
      whatsapp: entity.whatsapp,
      phone: entity.phone,
      instagram: entity.instagram,
      facebook: entity.facebook,
      linkedin: entity.linkedin,
      profileImage: entity.profileImage,
      bio: entity.bio,
      careerStartDate: entity.careerStartDate,
      creci: entity.creci,
      gender: entity.gender,
      specialties: entity.specialties,
    };
  }
}
