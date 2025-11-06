import { IsString, MaxLength, MinLength } from 'class-validator';

export class SlugParamDto {
  @IsString()
  @MinLength(3)
  @MaxLength(26)
  slug: string;
}
