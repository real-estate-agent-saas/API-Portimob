import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

// DTOs
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';

//Use Cases
import { CreatePropertyUseCase } from './application/use-cases/create-property.usecase';
import { FindAllPropertiesUseCase } from './application/use-cases/find-all-properties.usecase';
import { FindOnePropertyUseCase } from './application/use-cases/find-one-property.usecase';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.usecase';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.usecase';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly findAllPropertiesUseCase: FindAllPropertiesUseCase,
    private readonly findOnePropertyUseCase: FindOnePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.createPropertyUseCase.execute(
      createPropertyDto,
      user.id as string,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.updatePropertyUseCase.execute(
      propertyId,
      updatePropertyDto,
      user.id!,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.findAllPropertiesUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.findOnePropertyUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.deletePropertyUseCase.execute(id);
  }
}
