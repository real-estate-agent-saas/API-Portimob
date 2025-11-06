import { WebsiteEntity } from 'src/websites/entities/website.entity';
import { Website, WebsiteDocument } from '../schemas/websites.schema';
import { FlattenMaps, Types } from 'mongoose';

// To cover both Mongoose Document and plain object
type WebsiteSource = FlattenMaps<WebsiteDocument> | Website;

export class WebsiteMapper {
  static toEntity(document: WebsiteSource): WebsiteEntity {
    return WebsiteEntity.create(
      {
        id: document._id?.toString(),
        userId: document.userId?.toString(),
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
      },
      document.templateCode,
      document.templateConfigId?.toString(),
    );
  }

  static toDocument(entity: WebsiteEntity): Partial<Website> {
    return {
      templateConfigId: new Types.ObjectId(entity.getTemplateConfigId()),
      userId: new Types.ObjectId(entity.userId),
      templateCode: entity.getTemplateCode(),
      websiteName: entity.websiteName,
      slug: entity.getSlug(),
      customDomain: entity.customDomain,
      logoURL: entity.logoURL,
      realtorName: entity.realtorName,
      publicEmail: entity.publicEmail,
      whatsapp: entity.whatsapp,
      phone: entity.phone,
      instagram: entity.instagram,
      facebook: entity.facebook,
      linkedin: entity.linkedin,
      profileImage: entity.getProfileImage(),
      bio: entity.bio,
      careerStartDate: entity.careerStartDate,
      creci: entity.creci,
      gender: entity.gender,
      specialties: entity.specialties,
    };
  }
}
