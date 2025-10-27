import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { UpdateWebsiteUseCase } from './application/use-cases/update-website.usecase';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { FindOneWebsiteUseCase } from './application/use-cases/find-one.usecase';

@Controller('websites')
export class WebsitesController {
  constructor(
    private readonly findOneWebsiteUseCase: FindOneWebsiteUseCase,
    private readonly updateWebsiteUseCase: UpdateWebsiteUseCase,
  ) {}

  @Patch()
  update(@CurrentUser() user: UserEntity, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.updateWebsiteUseCase.execute(user.id!, updateWebsiteDto);
  }

  @Get()
  findOneByUserId(@CurrentUser() user: UserEntity) {
    return this.findOneWebsiteUseCase.execute(user.id!);
  }


}
