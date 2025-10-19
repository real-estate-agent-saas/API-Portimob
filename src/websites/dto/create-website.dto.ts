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
@IsString()
careerStartDate?: Date;

@IsOptional()
@IsString()
creci?: string;

@IsOptional()
@IsString()
gender?: string;

@IsOptional()
@IsString()
specialties?: string[];

/*Usamos algum recurso do class validator por conta dos dados do constructor?*/ 
/*Explicar Gallerry Validation do create property*/

}
