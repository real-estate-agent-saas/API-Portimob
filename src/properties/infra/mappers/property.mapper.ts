import { PropertyEntity } from 'src/properties/entities/property.entity';
import { Property, PropertyDocument } from '../schemas/properties.schema';
import { FlattenMaps, Types } from 'mongoose';

// To cover both Mongoose Document and plain object
type PropertySource = FlattenMaps<PropertyDocument> | Property;

export class PropertyMapper {
  static toEntity(document: PropertySource): PropertyEntity {
    return PropertyEntity.create(
      {
        id: document._id.toString(),
        title: document.title,
        description: document.description,
        area: document.area,
        price: document.price,
        roomsQty: document.roomsQty,
        bathroomsQty: document.bathroomsQty,
        parkingSpacesQty: document.parkingSpacesQty,
        coverImage: document.coverImage,
        videoUrl: document.videoUrl,
        isActive: document.isActive,
        isFurnished: document.isFurnished,
        isNearSubway: document.isNearSubway,
        isFeatured: document.isFeatured,
        propertyType: document.propertyType,
        propertyPurpose: document.propertyPurpose,
        propertyStanding: document.propertyStanding,
        propertyDeliveryStatus: document.propertyDeliveryStatus,
        propertyTypology: document.propertyTypology,
        propertyLeisure: document.propertyLeisure?.map((l) => l),
        propertyGallery: document.propertyGallery,
        propertyFloorPlanGallery: document.propertyFloorPlanGallery,
        address: document.address,
      },
      document.userId?.toString(),
    );
  }

  static toDocument(entity: PropertyEntity): Partial<Property> {
    return {
      userId: new Types.ObjectId(entity.userId),
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
    };
  }
}
