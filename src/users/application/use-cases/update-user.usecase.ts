import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserEntity } from '../../entities/user.entity';
import type { IUserRepository } from '../../repositories/Iuser.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }
}
