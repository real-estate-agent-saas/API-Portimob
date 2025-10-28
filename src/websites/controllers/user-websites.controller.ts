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
import { FindOneWebsiteUseCase } from '../application/use-cases/user-websites/find-one.usecase';
import { GetAllSpecialtiesUseCase } from '../application/use-cases/user-websites/get-all-specialties.usecase';
import { UpdateProfileImageUseCase } from '../application/use-cases/user-websites/update-profile-image.usecase';
import { UpdateWebsiteUseCase } from '../application/use-cases/user-websites/update-website.usecase';
import { GetSlugUseCase } from '../application/use-cases/user-websites/get-slug.usecase';
import { UpdateSlugUseCase } from '../application/use-cases/user-websites/update-slug.usecase';

// DTOs
import { UpdateWebsiteDto } from '../dto/update-website.dto';
import { UpdateProfileImageDto } from '../dto/update-profileImage.dto';
import { UpdateSlugDto } from '../dto/update-slug.dto';
import { CheckSlugAvailabilityUseCase } from '../application/use-cases/user-websites/check-slug-availability.usecase';

@Controller('websites/user')
export class UserWebsitesController {
  constructor(
    private readonly findOneWebsiteUseCase: FindOneWebsiteUseCase,
    private readonly updateWebsiteUseCase: UpdateWebsiteUseCase,
    private readonly getAllSpecialtiesUseCase: GetAllSpecialtiesUseCase,
    private readonly updateProfileImageUseCase: UpdateProfileImageUseCase,
    private readonly updateSlugUseCase: UpdateSlugUseCase,
    private readonly getSlugUseCase: GetSlugUseCase,
    private readonly checkSlugAvailabilityUseCase: CheckSlugAvailabilityUseCase,
  ) {}

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

  @Get()
  findOneByUserId(@CurrentUser() user: UserEntity) {
    return this.findOneWebsiteUseCase.execute(user.id!);
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
