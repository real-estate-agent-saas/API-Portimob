import { IsString, MinLength } from 'class-validator';

export class SlugParamDto {
  @IsString()
  @MinLength(3)
  slug: string;
}
