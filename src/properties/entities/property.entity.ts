import {
  Address,
  Category,
  Gallery,
  IProperty,
} from '../interfaces/property.interface';

export class PropertyEntity implements IProperty {
  readonly id?: string;
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
  isActive?: boolean;
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

  // Gallery
  propertyGallery?: Gallery[];
  propertyFloorPlanGallery?: Gallery[];

  // Address
  address?: Address;

  // User relationship
  userId: string;

  // Expects Property props and its ID
  private constructor(props: IProperty) {
    const {
      id,
      userId,
      title,
      area,
      price,
      roomsQty,
      bathroomsQty,
      parkingSpacesQty,
      isActive,
      propertyType,
      propertyPurpose,
      propertyStanding,
      propertyDeliveryStatus,
      propertyTypology,
      propertyLeisure,
      address,
    } = props;

    // Insertions
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.price = price;
    this.area = area;
    this.roomsQty = roomsQty;
    this.bathroomsQty = bathroomsQty;
    this.parkingSpacesQty = parkingSpacesQty;
    this.isActive = isActive ?? true;
    this.propertyType = propertyType;
    this.propertyPurpose = propertyPurpose;
    this.propertyStanding = propertyStanding;
    this.propertyDeliveryStatus = propertyDeliveryStatus;
    this.propertyTypology = propertyTypology;
    this.propertyLeisure = propertyLeisure;
    this.address = address;
  }

  //---------------------------  Method ------------------------------------

  static create(props: IProperty): PropertyEntity {
    PropertyEntity.validateProps(props);
    return new PropertyEntity(props);
  }

  update(props: Partial<IProperty>): void {
    Object.assign(this, props);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  //---------------------------  Private Validation  -----------------------------

  private static validateProps(props: IProperty): void {
    if (!props.userId)
      throw new Error('O imóvel precisa estar associado a um usuário!');
    if (!props.title || props.title.trim().length < 3)
      throw new Error('O título deve ter pelo menos 3 caracteres!');
    if (props.price !== undefined && props.price < 0)
      throw new Error('O preço não pode ser negativo!');
    if (props.roomsQty !== undefined && props.roomsQty < 0)
      throw new Error('O preço não pode ser negativo!');
    if (props.bathroomsQty !== undefined && props.bathroomsQty < 0)
      throw new Error('O preço não pode ser negativo!');
    if (props.parkingSpacesQty !== undefined && props.parkingSpacesQty < 0)
      throw new Error('O preço não pode ser negativo!');
    if (props.area !== undefined && props.area < 0)
      throw new Error('A área não pode ser negativa!');
  }
}
