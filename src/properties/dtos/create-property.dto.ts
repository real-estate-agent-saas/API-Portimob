import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

class ImageItemDto {
  @IsString()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  order: number;
}

class CategoryDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class CreatePropertyDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  area?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  roomsQty?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bathroomsQty?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
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

  // Categories
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

  // Address
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  // Galleries
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


}
