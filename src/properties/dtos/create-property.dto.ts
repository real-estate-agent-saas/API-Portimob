import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

// ----------------------------------- Gallery Validation ----------------------
class ImageItemDto {
  @IsString()
  imageUrl: string;

  @IsNumber()
  order: number;
}

class CategoryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
// -------------------------------- Basic Property data -------------------------
export class CreatePropertyDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsNumber()
  roomsQty?: number;

  @IsOptional()
  @IsNumber()
  bathroomsQty?: number;

  @IsOptional()
  @IsNumber()
  parkingSpacesQty?: number;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  // Flags & status
  @IsOptional()
  @IsBoolean()
  isFurnished?: boolean;

  @IsOptional()
  @IsBoolean()
  isNearSubway?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  //----------------------------- Categories ---------------------------
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  propertyType?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  propertyPurpose?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  propertyStanding?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  propertyDeliveryStatus?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  propertyTypology?: CategoryDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  propertyLeisure?: CategoryDto[];

  //----------------------------- Address DTO ----------------------------
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  // ------------------------------- Galleries------------------------------
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageItemDto)
  propertyGallery?: ImageItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageItemDto)
  propertyFloorPlanGallery?: ImageItemDto[];

  // ---------------------------- User Relationship ------------------------------
  @IsString()
  userId: string;
}
