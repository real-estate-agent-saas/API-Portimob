import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateWebsiteDto } from './create-website.dto';
import { IsOptional, IsString, IsDate, IsArray } from 'class-validator';

export class UpdateWebsiteDto extends PartialType(
  OmitType(CreateWebsiteDto, ['userId'] as const),
) {
    
  // -------------------------------- Website data -------------------------
  @IsOptional()
  @IsString()
  websiteName?: string;

  @IsOptional()
  @IsString()
  logoURL?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  customDomain?: string;

  // -------------------------------- Realtor data -------------------------
  @IsOptional()
  @IsString()
  realtorName?: string;

  @IsOptional()
  @IsString()
  publicEmail?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDate()
  careerStartDate?: Date;

  @IsOptional()
  @IsString()
  creci?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];
}
