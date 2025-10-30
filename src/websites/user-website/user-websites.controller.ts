import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

// Use Cases
import { GetUserWebsiteUseCase } from './application/use-cases/get-user-website.usecase';
import { GetAllSpecialtiesUseCase } from './application/use-cases/get-all-specialties.usecase';
import { UpdateProfileImageUseCase } from './application/use-cases/update-profile-image.usecase';
import { UpdateWebsiteUseCase } from './application/use-cases/update-website.usecase';
import { GetSlugUseCase } from './application/use-cases/get-slug.usecase';
import { UpdateSlugUseCase } from './application/use-cases/update-slug.usecase';
import { CheckSlugAvailabilityUseCase } from './application/use-cases/check-slug-availability.usecase';
import { ChangeTemplateUseCase } from './application/use-cases/change-template.usecase';

// DTOs
import { UpdateWebsiteDto } from './dtos/update-website.dto';
import { UpdateProfileImageDto } from './dtos/update-profileImage.dto';
import { UpdateSlugDto } from './dtos/update-slug.dto';

@Controller('websites/user')
export class UserWebsitesController {
  constructor(
    private readonly getUserWebsiteUseCase: GetUserWebsiteUseCase,
    private readonly updateWebsiteUseCase: UpdateWebsiteUseCase,
    private readonly getAllSpecialtiesUseCase: GetAllSpecialtiesUseCase,
    private readonly updateProfileImageUseCase: UpdateProfileImageUseCase,
    private readonly updateSlugUseCase: UpdateSlugUseCase,
    private readonly getSlugUseCase: GetSlugUseCase,
    private readonly checkSlugAvailabilityUseCase: CheckSlugAvailabilityUseCase,
    private readonly changeTemplateUseCase: ChangeTemplateUseCase,
  ) {}

  @Patch('change-template/:templateCode')
  changeTemplate(
    @CurrentUser() user: UserEntity,
    @Param('templateCode') templateCode: string,
  ) {
    return this.changeTemplateUseCase.execute(user.id!, templateCode);
  }

  @Get()
  getUserWebsiteByUserId(@CurrentUser() user: UserEntity) {
    return this.getUserWebsiteUseCase.execute(user.id!);
  }

  @Patch('update-profile-image')
  updateProfileImage(
    @CurrentUser() user: UserEntity,
    @Body() profileImageDto: UpdateProfileImageDto,
  ) {
    return this.updateProfileImageUseCase.execute(
      user.id!,
      profileImageDto.profileImage,
    );
  }

  @Patch()
  update(
    @CurrentUser() user: UserEntity,
    @Body() updateWebsiteDto: UpdateWebsiteDto,
  ) {
    return this.updateWebsiteUseCase.execute(user.id!, updateWebsiteDto);
  }

  @Get('specialties')
  getAllSpecialties() {
    return this.getAllSpecialtiesUseCase.execute();
  }

  @Get('get-slug')
  getSlug(@CurrentUser() user: UserEntity) {
    return this.getSlugUseCase.execute(user.id!);
  }

  @Patch('update-slug')
  updateSlug(@CurrentUser() user: UserEntity, @Body() slugDto: UpdateSlugDto) {
    return this.updateSlugUseCase.execute(user.id!, slugDto.slug);
  }

  @Post('check-slug-availability')
  checkSlugAvailability(@Body() slugDto: UpdateSlugDto) {
    return this.checkSlugAvailabilityUseCase.execute(slugDto.slug);
  }
}
