import { PropertyEntity } from '../entities/property.entity';
import { PropertyDocument } from '../schemas/properties.schema';
import { PropertyPersistenceModel } from './model/property-persistence.model';

export class PropertyMapper {
  /**
   * Converte um documento do Mongo (PropertyDocument)
   * em uma entidade de domínio (PropertyEntity)
   */
  static toEntity(property: PropertyDocument): PropertyEntity {
    return PropertyEntity.create({
      id: property._id?.toString(),
      title: property.title,
      description: property.description,
      area: property.area,
      price: property.price,
      roomsQty: property.roomsQty,
      bathroomsQty: property.bathroomsQty,
      parkingSpacesQty: property.parkingSpacesQty,
      coverImage: property.coverImage,
      videoUrl: property.videoUrl,
      isActive: property.isActive,
      isFurnished: property.isFurnished,
      isNearSubway: property.isNearSubway,
      isFeatured: property.isFeatured,
      propertyType: property.propertyType,
      propertyPurpose: property.propertyPurpose,
      propertyStanding: property.propertyStanding,
      propertyDeliveryStatus: property.propertyDeliveryStatus,
      propertyTypology: property.propertyTypology,
      propertyLeisure: property.propertyLeisure,
      propertyGallery: property.propertyGallery,
      propertyFloorPlanGallery: property.propertyFloorPlanGallery,
      address: property.address,
      userId: property.userId,
    });
  }

  /**
   * Converte uma entidade de domínio (PropertyEntity)
   * em um objeto plano que o Mongoose entende para persistência
   */
  static toPersistence(
    entity: PropertyEntity,
  ): PropertyPersistenceModel {
    return {
      title: entity.title,
      description: entity.description,
      area: entity.area,
      price: entity.price,
      roomsQty: entity.roomsQty,
      bathroomsQty: entity.bathroomsQty,
      parkingSpacesQty: entity.parkingSpacesQty,
      coverImage: entity.coverImage,
      videoUrl: entity.videoUrl,
      isActive: entity.isActive ?? true,
      isFurnished: entity.isFurnished,
      isNearSubway: entity.isNearSubway,
      isFeatured: entity.isFeatured,
      propertyType: entity.propertyType,
      propertyPurpose: entity.propertyPurpose,
      propertyStanding: entity.propertyStanding,
      propertyDeliveryStatus: entity.propertyDeliveryStatus,
      propertyTypology: entity.propertyTypology,
      propertyLeisure: entity.propertyLeisure,
      propertyGallery: entity.propertyGallery,
      propertyFloorPlanGallery: entity.propertyFloorPlanGallery,
      address: entity.address,
      userId: entity.userId,
    };
  }
}
