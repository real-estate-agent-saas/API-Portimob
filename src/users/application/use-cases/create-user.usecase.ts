import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import type { IUserRepository } from '../../infra/repositories/Iuser.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserPresenter } from '../presenters/create-user.presenter';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<CreateUserPresenter> {
    // Verifies if a user with the given email already exists
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    // If user exists, throw a conflict exception
    if (existingUser) {
      throw new ConflictException('Usuário já existe. Faça login!');
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new UserEntity
    const userEntity = UserEntity.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    // Save the new user to the repository
    const createdUser = await this.userRepository.create(userEntity);

    // Return the created user without the password
    return CreateUserPresenter.fromEntity(createdUser);
  }
}
