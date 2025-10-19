import {
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
    IsArray,
    ValidateNested,
    IsUrl,
    IsDate,
  } from 'class-validator';
  import { Type } from 'class-transformer';

export class CreateWebsiteDto {

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
@IsString({ each:true })
specialties?: string[];

}
