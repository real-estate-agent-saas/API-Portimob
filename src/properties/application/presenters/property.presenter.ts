import { Address } from 'src/properties/entities/value-objects/address.vo';
import { Category } from 'src/properties/entities/value-objects/category.vo';
import { Gallery } from 'src/properties/entities/value-objects/gallery.vo';
import { PropertyEntity } from 'src/properties/entities/property.entity';
import { PropertyDocument } from 'src/properties/infra/schemas/properties.schema';

export class PropertyPresenter {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly area?: number;
  readonly price?: number;
  readonly roomsQty?: number;
  readonly bathroomsQty?: number;
  readonly parkingSpacesQty?: number;
  readonly coverImage?: string;
  readonly videoUrl?: string;
  readonly isActive?: boolean;
  readonly isFurnished?: boolean;
  readonly isNearSubway?: boolean;
  readonly isFeatured?: boolean;

  readonly propertyType?: Category;
  readonly propertyPurpose?: Category;
  readonly propertyStanding?: Category;
  readonly propertyDeliveryStatus?: Category;
  readonly propertyTypology?: Category;
  readonly propertyLeisure?: Category[];

  readonly propertyGallery?: Gallery[];
  readonly propertyFloorPlanGallery?: Gallery[];

  readonly address?: Address;

  readonly userId: string;

  private constructor(props: PropertyPresenter) {
    Object.assign(this, props);
  }

  /**
   * Monta o objeto de resposta combinando a entidade (negócio)
   * com o documento (IDs vindos do Mongo)
   */
  static fromEntity(entity: PropertyEntity): PropertyPresenter {
    return new PropertyPresenter({
      id: entity.id!,
      title: entity.title,
      description: entity.description,
      area: entity.area,
      price: entity.price,
      roomsQty: entity.roomsQty,
      bathroomsQty: entity.bathroomsQty,
      parkingSpacesQty: entity.parkingSpacesQty,
      coverImage: entity.coverImage,
      videoUrl: entity.videoUrl,
      isActive: entity.isActive,
      isFurnished: entity.isFurnished,
      isNearSubway: entity.isNearSubway,
      isFeatured: entity.isFeatured,
      userId: entity.userId,
      address: entity.address,
      propertyGallery: entity.propertyGallery,
      propertyFloorPlanGallery: entity.propertyFloorPlanGallery,
      propertyType: entity.propertyType,
      propertyPurpose: entity.propertyPurpose,
      propertyStanding: entity.propertyStanding,
      propertyDeliveryStatus: entity.propertyDeliveryStatus,
      propertyTypology: entity.propertyTypology,
      propertyLeisure: entity.propertyLeisure,
    });
  }
}
