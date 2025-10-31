import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  websiteId?: string;
}
