import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateWebsiteDto } from '../dto/update-website.dto';
import { UpdateWebsiteUseCase } from '../application/use-cases/user-websites/update-website.usecase';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { FindOneWebsiteUseCase } from '../application/use-cases/user-websites/find-one.usecase';

@Controller('websites/tenant')
export class TenantWebsitesController {
  constructor() {}


}
