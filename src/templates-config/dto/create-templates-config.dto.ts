import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateConfigDto {
  @IsString()
  @IsNotEmpty()
  readonly websiteId: string;

  @IsString()
  @IsNotEmpty()
  readonly templateCode: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
