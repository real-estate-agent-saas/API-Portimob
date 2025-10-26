import { Address } from './value-objects/address.vo';
import { Gallery } from './value-objects/gallery.vo';
import { Category } from './value-objects/category.vo';
import { ForbiddenPropertyUpdate } from '../errors/forbidden-property-update.error';
import { InvalidPropertyError } from '../errors/invalid-property.error';

export interface PropertyProps {
  id?: string;
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

  // Galleries
  propertyGallery?: Gallery[];
  propertyFloorPlanGallery?: Gallery[];

  // Address
  address?: Address;
}

export class PropertyEntity {
  readonly id?: string;
  readonly userId: string;
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

  // Expects Property props and its ID
  private constructor(props: PropertyProps, userId: string) {
    // Insertions
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.userId = userId;
    this.price = props.price;
    this.area = props.area;
    this.coverImage = props.coverImage;
    this.videoUrl = props.videoUrl;
    this.roomsQty = props.roomsQty;
    this.bathroomsQty = props.bathroomsQty;
    this.parkingSpacesQty = props.parkingSpacesQty;
    this.isActive = props.isActive ?? true;
    this.isFeatured = props.isFeatured ?? false;
    this.isNearSubway = props.isNearSubway;
    this.propertyType = props.propertyType;
    this.propertyPurpose = props.propertyPurpose;
    this.propertyStanding = props.propertyStanding;
    this.propertyDeliveryStatus = props.propertyDeliveryStatus;
    this.propertyTypology = props.propertyTypology;
    this.propertyLeisure = props.propertyLeisure;
    this.address = props.address;
    this.propertyGallery = props.propertyGallery;
    this.propertyFloorPlanGallery = props.propertyFloorPlanGallery;
  }

  //---------------------------  Private Validation  -----------------------------

  private static validateProps(props: PropertyProps): void {
    if (!props.title || props.title.trim().length < 3)
      throw new InvalidPropertyError(
        'O título deve ter pelo menos 3 caracteres!',
      );
    if (props.price !== undefined && props.price < 0)
      throw new InvalidPropertyError('O preço não pode ser negativo!');
    if (props.roomsQty !== undefined && props.roomsQty < 0)
      throw new InvalidPropertyError('O preço não pode ser negativo!');
    if (props.bathroomsQty !== undefined && props.bathroomsQty < 0)
      throw new InvalidPropertyError('O preço não pode ser negativo!');
    if (props.parkingSpacesQty !== undefined && props.parkingSpacesQty < 0)
      throw new InvalidPropertyError('O preço não pode ser negativo!');
    if (props.area !== undefined && props.area < 0)
      throw new InvalidPropertyError('A área não pode ser negativa!');
  }

  //---------------------------  Method ------------------------------------

  static create(props: PropertyProps, userId: string): PropertyEntity {
    PropertyEntity.validateProps(props);
    return new PropertyEntity(props, userId);
  }

  update(props: Partial<PropertyProps>, userId: string): void {
    if (this.userId !== userId) throw new ForbiddenPropertyUpdate();
    Object.assign(this, props);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
