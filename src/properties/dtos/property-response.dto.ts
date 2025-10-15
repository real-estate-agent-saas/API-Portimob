import { PropertyEntity } from "../entities/property.entity";

export class PropertyResponseDto {
  id: string;
  title: string;
  area?: number;
  price?: number;
  roomsQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  description?: string;
  youtubeURL?: string;
  coverImage?: string;
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;

  propertyType?: { id: string; name: string };
  propertyPurpose?: { id: string; name: string };
  propertyStanding?: { id: string; name: string };
  propertyDeliveryStatus?: { id: string; name: string };
  propertyTypology?: { id: string; name: string };
  propertyLeisure?: { id: string; name: string }[];

  propertyGallery?: { imageUrl: string; order?: number }[];
  propertyFloorPlanGallery?: { imageUrl: string; order?: number }[];

  address?: {
    street?: string;
    propertyNumber?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    zone?: string;
  };

  userId: string;

  static fromEntity(entity: PropertyEntity): PropertyResponseDto {
    const dto = new PropertyResponseDto();

    Object.assign(dto, entity);

    return dto;
  }
}
