// Property Categories
export class Category {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

// Property Gallery
export class Gallery {
  constructor(
    public imageUrl: string,
    public order: number,
  ) {
    if (order < 0) throw new Error('Ordem inválida');
  }
}

// Property Address
export class Address {
  constructor(
    public street?: string,
    public propertyNumber?: string,
    public complement?: string,
    public neighborhood?: string,
    public city?: string,
    public state?: string,
    public zipCode?: string,
    public zone?: string,
    public latitude?: number,
    public longitude?: number,
  ) {}
}

export interface IProperty {
  id?: string; //Property ID
  userId: string; // Property Owner
  title: string;
  description?: string;
  area?: number;
  price?: number;
  roomsQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  coverImage?: string;
  videoUrl?: string;

  // Status & Flags
  isActive?: boolean; // Property control
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;

  // Categories
  propertyType?: Category;
  propertyPurpose?: Category;
  propertyStanding?: Category;
  propertyDeliveryStatus?: Category;
  propertyTypology?: Category;
  propertyLeisure?: Category[];

  // Galleries
  propertyGallery?: Gallery[];
  propertyFloorPlanGallery?: Gallery[];

  // Address
  address?: Address;
}
