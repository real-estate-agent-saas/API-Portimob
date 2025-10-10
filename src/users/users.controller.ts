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
import { UsersService } from './users.service';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Use Cases
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }









  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }



  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

}
