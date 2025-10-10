import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';
import { CreateFloorPlanGalleryDto } from './create-floorPlanGallery.dto';
import { CreatePropertyGalleryDto } from './create-propertyGallery.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  youtubeURL?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

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
  @IsInt()
  propertyPurposeId?: number;

  @IsOptional()
  @IsInt()
  propertyStandingId?: number;

  @IsOptional()
  @IsInt()
  propertyTypeId?: number;

  @IsOptional()
  @IsInt()
  propertyTypologyId?: number;

  @IsOptional()
  @IsInt()
  deliveryStatusId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  propertyLeisure?: number[];

  // --------------------------------------- NESTED VALIDATIONS -----------------------

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyGalleryDto)
  propertyGallery?: CreatePropertyGalleryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFloorPlanGalleryDto)
  floorPlanGallery?: CreateFloorPlanGalleryDto[];

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
