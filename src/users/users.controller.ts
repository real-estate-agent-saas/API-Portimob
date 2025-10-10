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

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Presenters
import { CreateUserPresenter } from './application/presenters/create-user.presenter';

//Use Cases
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { FindAllUseCase } from './application/use-cases/find-all.usecase';
import { FindOneUseCase } from './application/use-cases/find-one.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const userEntity = await this.createUserUseCase.execute(createUserDto);
    return CreateUserPresenter.toHttp(userEntity);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }
}
