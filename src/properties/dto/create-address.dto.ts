import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  propertyNumber?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  stateId?: number;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  zoneId?: number;
}
