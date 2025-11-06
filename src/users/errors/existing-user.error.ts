import { ValidationError } from 'src/core/errors/types/validation.error';

export class ExistingUserError extends ValidationError {
  constructor(metadata?: Record<string, any>) {
    super('Usuário já existe', metadata);
  }
}