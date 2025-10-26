import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class UpdateTemplateConfigDto {
  @IsString()
  @IsNotEmpty()
  readonly templateConfigId: string;

  @IsObject()
  @IsOptional()
  readonly values?: Record<string, any>;
}
