import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplatesConfigDto } from './create-templates-config.dto';

export class UpdateTemplatesConfigDto extends PartialType(CreateTemplatesConfigDto) {}
