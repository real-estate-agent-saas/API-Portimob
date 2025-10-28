import { IsString } from "class-validator";

export class UpdateSlugDto {
  @IsString()
  slug: string;
}
