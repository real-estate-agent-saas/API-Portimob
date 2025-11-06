import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUserRepository } from 'src/users/infra/repositories/Iuser.repository';
import * as bcrypt from 'bcrypt';
import { InactiveUserError } from 'src/users/errors/inactive-user.error';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async excecute(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    // If no user is found, return generic unauthorized
    if (!existingUser) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    // Checks if the user is active
    if (existingUser.isActive === false) {
      throw new InactiveUserError();
    }

    // Compare the password sent with the password from the DB
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      // Generic message to not reveal which information is incorrect
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return {
      ...existingUser,
      password: undefined,
    };
  }
}
