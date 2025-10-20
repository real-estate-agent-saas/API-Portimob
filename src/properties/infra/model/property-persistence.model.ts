
export interface PropertyPersistenceModel {
  title: string;
  description?: string;
  area?: number;
  price?: number;
  roomsQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  coverImage?: string;
  videoUrl?: string;
  isActive: boolean;
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;

  propertyType?: { id: string; name: string };
  propertyPurpose?: { id: string; name: string };
  propertyStanding?: { id: string; name: string };
  propertyDeliveryStatus?: { id: string; name: string };
  propertyTypology?: { id: string; name: string };
  propertyLeisure?: { id: string; name: string }[];

  propertyGallery?: { imageUrl: string; order: number }[];
  propertyFloorPlanGallery?: { imageUrl: string; order: number }[];

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
}
