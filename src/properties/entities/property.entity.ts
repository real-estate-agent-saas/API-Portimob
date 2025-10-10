export class Property {
  readonly id?: string;
  title: string;
  roomsQty: number;
  bathroomsQty: number;
  parkingSpacesQty: number;
  area: number;
  price: number;
  description?: string;
  youtubeURL?: string;
  coverImage?: string;
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  address?: {
    street?: string;
    propertyNumber?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    zone?: string;
    state?: string;
  };

  // Simple Relationships
  deliveryStatusId?: string;
  propertyTypologyId?: string;
  propertyTypeId?: string;
  propertyStandingId?: string;
  propertyPurposeId?: string;

  // Images Relationships
  propertyGallery?: { imageUrl: string; order?: number }[];
  floorPlanGallery?: { imageUrl: string; order?: number }[];

  //Relationship
  userId: string;
}
