export class PropertyEntity {
  // Main data
  readonly id?: string;
  title: string;
  area?: number;
  price?: number;
  roomsQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  description?: string;
  youtubeURL?: string;
  coverImage?: string;

  // Flags & status
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;

  // Categories
  propertyType?: {
    id: string;
    name: string;
  };

  propertyPurpose?: {
    id: string;
    name: string;
  };

  propertyStanding?: {
    id: string;
    name: string;
  };

  propertyDeliveryStatus?: {
    id: string;
    name: string;
  };

  propertyTypology?: {
    id: string;
    name: string;
  };

  propertyLeisure?: {
    id: string;
    name: string;
  }[];

  // Gallery
  propertyGallery?: { imageUrl: string; order?: number }[];
  propertyFloorPlanGallery?: { imageUrl: string; order?: number }[];

  // Address
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

  // User relationship
  userId: string;

  constructor(
    title: string,
    userId: string,
    id?: string,
    props?: Partial<Omit<PropertyEntity, 'title' | 'userId' | 'id'>>,
  ) {
    this.title = title;
    this.userId = userId;
    this.id = id;

    if (props) {
      Object.assign(this, props);
    }
  }
}
