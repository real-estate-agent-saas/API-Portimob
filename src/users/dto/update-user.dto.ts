import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ArrayUnique, IsArray, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
  @IsDateString()
  careerStartDate?: string;

  @IsOptional()
  @IsString()
  creci?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  // Relationship to Specialty
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  specialties?: string[];
}
