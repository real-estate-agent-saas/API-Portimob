import { PropertyEntity } from 'src/properties/entities/property.entity';
import { Address } from 'src/properties/entities/value-objects/address.vo';
import { Gallery } from 'src/properties/entities/value-objects/gallery.vo';
import { PropertyDocument } from '../schemas/properties.schema';
import { PropertyPersistenceModel } from '../model/property-persistence.model';

export class PropertyMapper {
  static toEntity(document: PropertyDocument): PropertyEntity {
    const address = document.address
      ? new Address(
          document.address.street,
          document.address.propertyNumber,
          document.address.complement,
          document.address.neighborhood,
          document.address.city,
          document.address.state,
          document.address.zipCode,
          document.address.zone,
          document.address.latitude,
          document.address.longitude,
        )
      : undefined;

    const propertyGallery = document.propertyGallery?.map(
      (g) => new Gallery(g.imageUrl, g.order),
    );

    const propertyFloorPlanGallery = document.propertyFloorPlanGallery?.map(
      (g) => new Gallery(g.imageUrl, g.order),
    );

    return PropertyEntity.create({
      id: document._id.toString(),
      userId: document.userId,
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
      propertyGallery,
      propertyFloorPlanGallery,
      address,
    });
  }


  static toDocument(entity: PropertyEntity): PropertyPersistenceModel {
    return {
      userId: entity.userId,
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
      propertyGallery: entity.propertyGallery?.map((g) => ({
        imageUrl: g.imageUrl,
        order: g.order,
      })),
      propertyFloorPlanGallery: entity.propertyFloorPlanGallery?.map((g) => ({
        imageUrl: g.imageUrl,
        order: g.order,
      })),
      address: entity.address
        ? {
            street: entity.address.street,
            propertyNumber: entity.address.propertyNumber,
            complement: entity.address.complement,
            neighborhood: entity.address.neighborhood,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            zone: entity.address.zone,
            latitude: entity.address.latitude,
            longitude: entity.address.longitude,
          }
        : undefined,
    };
  }
}
