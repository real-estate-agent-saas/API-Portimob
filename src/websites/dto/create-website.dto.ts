import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class Template {
  @IsString()
  name: string;

  @IsString()
  id: string;
}

export class CreateWebsiteDto {
  @IsString()
  templateConfigId: string;

  @IsString()
  userId: string;

  @ValidateNested()
  @Type(() => Template)
  template: Template;
}
