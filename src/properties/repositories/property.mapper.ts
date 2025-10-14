// import { PropertyEntity } from '../entities/property.entity';
// import { Property, PropertyDocument } from '../schemas/properties.schema';
// import { cloneArray, cloneObject } from '../../common/utils/cloneUtils';

// export class PropertyMapper {
//   public toDocument(entity: PropertyEntity): Property {
//     const document: Property = {
//       // Basic Data
//       title: entity.title,
//       userId: entity.userId,
//       description: entity.description,
//       price: entity.price,
//       area: entity.area,
//       roomsQty: entity.roomsQty,
//       bathroomsQty: entity.bathroomsQty,
//       parkingSpacesQty: entity.parkingSpacesQty,
//       youtubeURL: entity.youtubeURL,
//       coverImage: entity.coverImage,
//       isFurnished: entity.isFurnished,
//       isNearSubway: entity.isNearSubway,
//       isFeatured: entity.isFeatured,
//       isActive: entity.isActive,

//       // Categories
//       propertyType: cloneObject(entity.propertyType),
//       propertyPurpose: cloneObject(entity.propertyPurpose),
//       propertyStanding: cloneObject(entity.propertyStanding),
//       propertyDeliveryStatus: cloneObject(entity.propertyDeliveryStatus),
//       propertyTypology: cloneObject(entity.propertyTypology),
//       propertyLeisure: cloneArray(entity.propertyLeisure),

//       // Images
//       propertyGallery: cloneArray(entity.propertyGallery),
//       propertyFloorPlanGallery: cloneArray(entity.propertyFloorPlanGallery),

//       // Address
//       address: cloneObject(entity.address),
//     };

//     return document;
//   }

//   public static toEntity(doc: PropertyDocument): PropertyEntity {
//     return new PropertyEntity(doc.title, doc.userId, {
//       // Simple Data
//       area: doc.area,
//       price: doc.price,
//       roomsQty: doc.roomsQty,
//       bathroomsQty: doc.bathroomsQty,
//       parkingSpacesQty: doc.parkingSpacesQty,
//       description: doc.description,
//       youtubeURL: doc.youtubeURL,
//       coverImage: doc.coverImage,
//       isFurnished: doc.isFurnished,
//       isNearSubway: doc.isNearSubway,
//       isFeatured: doc.isFeatured,
//       isActive: doc.isActive,

//       // Categories
//       propertyType: cloneObject(doc.propertyType),
//       propertyPurpose: cloneObject(doc.propertyPurpose),
//       propertyStanding: cloneObject(doc.propertyStanding),
//       propertyDeliveryStatus: cloneObject(doc.propertyDeliveryStatus),
//       propertyTypology: cloneObject(doc.propertyTypology),
//       propertyLeisure: cloneArray(doc.propertyLeisure),

//       // Images
//       propertyGallery: cloneArray(doc.propertyGallery),
//       propertyFloorPlanGallery: cloneArray(doc.propertyFloorPlanGallery),

//       address: cloneObject(doc.address),
//     });
//   }
// }
