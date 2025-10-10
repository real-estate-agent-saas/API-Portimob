import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import type { IUserRepository } from '../../repositories/Iuser.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Usuário já existe. Faça login!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.passwordHash, 10);

    const userEntity = new UserEntity(
      createUserDto.name,
      createUserDto.email,
      hashedPassword,
    );

    return this.userRepository.create(userEntity);
  }
}
