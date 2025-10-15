import { PropertyEntity } from '../entities/property.entity';
import { PropertyDocument } from '../schemas/properties.schema';

export class PropertyMapper {
  static toEntity(property: PropertyDocument): PropertyEntity {
    return new PropertyEntity({
      id: property._id.toString(),
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
}
