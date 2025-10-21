import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

// Local Strategy - Responsable for validating user with Email and Password
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    return this.validateUserUseCase.validateUser(email, password);
  }
}
