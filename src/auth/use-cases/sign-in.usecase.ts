import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserToken } from '../models/UserToken';
import { UserPayload } from '../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class SignInUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async excecute(user: UserEntity, res: Response): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id!,
      email: user.email,
      name: user.name,
    };

    // Gera o token JWT assinado com os dados do usuário
    const jwtToken = this.jwtService.sign(payload);

    // Creates the cookie with the JWT Token
    res.cookie('access_token', jwtToken, {
      httpOnly: true, // Blocks acess by JavaScript
      secure: process.env.NODE_ENV === 'production', // Transacts the cookie with only with HTTPs if in Production
      sameSite: 'lax', // controls sending of cross-site requests
      maxAge: 1000 * 60 * 60 * 24 * 30, // Expires in 30d
    });

    // Retorna o token JWT
    return {
      access_token: jwtToken,
    };
  }
}
