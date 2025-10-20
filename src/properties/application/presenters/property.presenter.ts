import { Address } from 'src/properties/entities/value-objects/address.vo';
import { Category } from 'src/properties/entities/value-objects/category.vo';
import { Gallery } from 'src/properties/entities/value-objects/gallery.vo';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { PropertyDocument } from 'src/properties/infra/schemas/properties.schema';

export class PropertyPresenter {
  id: string;
  title: string;
  description?: string;
  area?: number;
  price?: number;
  roomsQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  coverImage?: string;
  videoUrl?: string;
  isActive?: boolean;
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;

  propertyType?: Category;
  propertyPurpose?: Category;
  propertyStanding?: Category;
  propertyDeliveryStatus?: Category;
  propertyTypology?: Category;
  propertyLeisure?: Category[];

  propertyGallery?: Gallery[];
  propertyFloorPlanGallery?: Gallery[];

  address?: Address;

  userId: string;

  /**
   * Monta o objeto de resposta combinando a entidade (negócio)
   * com o documento (IDs vindos do Mongo)
   */
  static fromEntity(entity: PropertyEntity): PropertyPresenter {
    const presenter = new PropertyPresenter();

    // Pure Entity data
    presenter.id = entity.id!;
    presenter.title = entity.title;
    presenter.description = entity.description;
    presenter.area = entity.area;
    presenter.price = entity.price;
    presenter.roomsQty = entity.roomsQty;
    presenter.bathroomsQty = entity.bathroomsQty;
    presenter.parkingSpacesQty = entity.parkingSpacesQty;
    presenter.coverImage = entity.coverImage;
    presenter.videoUrl = entity.videoUrl;
    presenter.isActive = entity.isActive;
    presenter.isFurnished = entity.isFurnished;
    presenter.isNearSubway = entity.isNearSubway;
    presenter.isFeatured = entity.isFeatured;
    presenter.userId = entity.userId;
    presenter.address = entity.address;
    presenter.propertyGallery = entity.propertyGallery;
    presenter.propertyFloorPlanGallery = entity.propertyFloorPlanGallery;

    // Dados relacionais com IDs (vindos do documento)
    presenter.propertyType = entity.propertyType;
    presenter.propertyStanding = entity.propertyStanding;
    presenter.propertyPurpose = entity.propertyPurpose;
    presenter.propertyDeliveryStatus = entity.propertyDeliveryStatus;
    presenter.propertyTypology = entity.propertyTypology;
    presenter.propertyLeisure = entity.propertyLeisure;
    return presenter;
  }
}
