import { UnauthorizedError } from 'src/core/errors/types/unauthorized.error';

export class InactiveUserError extends UnauthorizedError {
  constructor() {
    super('Sua conta está desativada. Entre em contato com o suporte');
  }
}
