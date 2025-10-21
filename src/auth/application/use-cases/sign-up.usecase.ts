import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from 'src/users/infra/repositories/Iuser.repository';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return 'SingUp method';
  }
}
