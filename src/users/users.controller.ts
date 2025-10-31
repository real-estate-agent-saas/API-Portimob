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
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Use Cases
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { FindAllUseCase } from './application/use-cases/find-all-user.usecase';
import { FindOneUseCase } from './application/use-cases/find-one-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  @Get('/me')
  getMe(@CurrentUser() user: UserEntity) {
    return user;
  }

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
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

}
