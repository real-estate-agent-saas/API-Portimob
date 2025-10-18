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
  constructor(props: IProperty) {
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

    // Validations before insert the atributes
    if (!title || title.trim().length < 3) throw new Error('Título inválido!');
    if (!userId) throw new Error('Um usuário associado é obrigatório!');
    if (area !== undefined && area < 0) throw new Error('Área inválida');
    if (price !== undefined && price < 0) throw new Error('Preço inválido');
    if (roomsQty !== undefined && roomsQty < 0)
      throw new Error('Quantidade de quartos inválida');
    if (bathroomsQty !== undefined && bathroomsQty < 0)
      throw new Error('Quantidade de banheiros inválida');
    if (parkingSpacesQty !== undefined && parkingSpacesQty < 0)
      throw new Error('Quantidade de vagas inválida');

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

  //---------------------------  Methods ------------------------------------

  static create(props: IProperty) {
    return new PropertyEntity(props);
  }

  static update(props: Partial<IProperty>) {}

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
