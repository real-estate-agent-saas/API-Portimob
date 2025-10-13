import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import type { IUserRepository } from 'src/users/repositories/Iuser.repository';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserEntity[] | []> {
    return this.userRepository.findAll();
  }
}
