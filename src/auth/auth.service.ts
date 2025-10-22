import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import type { IUserRepository } from 'src/users/infra/repositories/Iuser.repository';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Method generate the JWT token
  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id!,
      email: user.email,
      name: user.name,
    };

    // Gera o token JWT assinado com os dados do usuário
    const jwtToken = this.jwtService.sign(payload);

    // Retorna o token JWT
    return {
      access_token: jwtToken,
    };
  }

  // Método para validar as credenciais do usuário
  async validateUser(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);

    // If no user found, return generic unauthorized
    if (!existingUser) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Checks if the user is active
    if (existingUser.isActive === false) {
      throw new UnauthorizedException(
        'Sua conta está desativada. Entre em contato com o suporte.',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (isPasswordValid) {
      return {
        ...existingUser,
        password: undefined,
      };
    }

    // Generic message to not reveal which information is incorrect
    throw new UnauthorizedException('Credenciais inválidas.');
  }
}
