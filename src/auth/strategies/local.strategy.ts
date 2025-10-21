import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserUseCase } from '../application/use-cases/validate-user.usecase';

// Local Strategy - Responsable for validating user with Email and Password
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    return this.validateUserUseCase.execute(email, password);
  }
}
