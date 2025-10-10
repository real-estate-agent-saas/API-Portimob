import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import type { IUserRepository } from 'src/users/repositories/Iuser.repository';

@Injectable()
export class FindOneUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserEntity | null> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) throw new NotFoundException('Usuário não encontrado!');

    return existingUser;
  }
}
