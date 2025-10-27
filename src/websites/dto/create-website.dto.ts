import { IsString } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  userId: string;
}
