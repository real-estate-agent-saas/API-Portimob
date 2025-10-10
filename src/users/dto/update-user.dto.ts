import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  publicEmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  profileImage?: string;
  bio?: string;
  careerStartDate?: Date;
  creci?: string;
  gender?: string;

  // Control
  isActive?: boolean;

  // Relationships
  specialties?: string[];
  properties?: string[];
  dynamicWebsite?: string[];
}
