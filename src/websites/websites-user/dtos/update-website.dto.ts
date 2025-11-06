import {
  IsOptional,
  IsString,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/websites/entities/value-objects/gender.vo';


class Specialty {
  @IsString()
  id: string;
  @IsString()
  name: string;
}

export class UpdateWebsiteDto {
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
  gender?: Gender;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Specialty)
  specialties?: Specialty[];
}
