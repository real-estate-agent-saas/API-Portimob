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

  deliveryStatus?: {
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
  };

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

  // Gallery
  propertyGallery?: { imageUrl: string; order?: number }[];
  floorPlanGallery?: { imageUrl: string; order?: number }[];

  // User relationship
  userId: string;

  constructor(
    title: string,
    userId: string,
    props?: Partial<Omit<PropertyEntity, 'title' | 'userId' >>,
  ) {
    this.title = title;
    this.userId = userId;

    if (props) {
      Object.assign(this, props);
    }
  }
}
