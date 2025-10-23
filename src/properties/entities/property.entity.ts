import { Address } from './value-objects/address.vo';
import { Gallery } from './value-objects/gallery.vo';
import { Category } from './value-objects/category.vo';
import { InvalidPropertyError } from '../errors/invalid-property.error';
import { ForbiddenError } from 'src/core/errors/forbidden.error';

export interface PropertyProps {
  id?: string; //Property ID
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
    const {
      id,
      title,
      description,
      area,
      price,
      roomsQty,
      bathroomsQty,
      parkingSpacesQty,
      isActive,
      isFeatured,
      isNearSubway,
      coverImage,
      videoUrl,
      propertyType,
      propertyPurpose,
      propertyStanding,
      propertyDeliveryStatus,
      propertyTypology,
      propertyLeisure,
      address,
      propertyGallery,
      propertyFloorPlanGallery,
    } = props;

    // Insertions
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.price = price;
    this.area = area;
    this.coverImage = coverImage;
    this.videoUrl = videoUrl;
    this.roomsQty = roomsQty;
    this.bathroomsQty = bathroomsQty;
    this.parkingSpacesQty = parkingSpacesQty;
    this.isActive = isActive ?? true;
    this.isFeatured = isFeatured ?? false;
    this.isNearSubway = isNearSubway;
    this.propertyType = propertyType;
    this.propertyPurpose = propertyPurpose;
    this.propertyStanding = propertyStanding;
    this.propertyDeliveryStatus = propertyDeliveryStatus;
    this.propertyTypology = propertyTypology;
    this.propertyLeisure = propertyLeisure;
    this.address = address;
    this.propertyGallery = propertyGallery;
    this.propertyFloorPlanGallery = propertyFloorPlanGallery;
  }

  //---------------------------  Method ------------------------------------

  static create(props: PropertyProps, userId: string): PropertyEntity {
    PropertyEntity.validateProps(props, userId);
    return new PropertyEntity(props, userId);
  }

  update(props: Partial<PropertyProps>, userId: string): void {
    if (this.userId !== userId)
      throw new ForbiddenError(
        'Usuário não tem permissão para alterar esse imóvel',
      );
    Object.assign(this, props);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  //---------------------------  Private Validation  -----------------------------

  private static validateProps(props: PropertyProps, userId: string): void {
    if (!props.title || props.title.trim().length < 3)
      throw new InvalidPropertyError(
        'title',
        'O título deve ter pelo menos 3 caracteres',
      );
    if (props.price !== undefined && props.price < 0)
      throw new InvalidPropertyError('price', 'O preço não pode ser negativo');
    if (props.roomsQty !== undefined && props.roomsQty < 0)
      throw new InvalidPropertyError(
        'roomsQty',
        'A quantidade de quartos não pode ser negativa',
      );
    if (props.bathroomsQty !== undefined && props.bathroomsQty < 0)
      throw new InvalidPropertyError(
        'bathroomsQty',
        'A quantidade de banheiros não pode ser negativa',
      );
    if (props.parkingSpacesQty !== undefined && props.parkingSpacesQty < 0)
      throw new InvalidPropertyError(
        'parkingSpacesQty',
        'A quantidade de vagas de estacionamento não pode ser negativa',
      );
    if (props.area !== undefined && props.area < 0)
      throw new InvalidPropertyError('area', 'A área não pode ser negativa!');
  }
}
