import { ValidationError } from 'src/core/errors/types/validation.error';

/**
 * Specific error for validations inside the entity
 * Used when validation of a property fails (e.g. negative price, short title).
 */
export class UserIdNotProvidedError extends ValidationError {
  constructor() {
    super('É necessário um usuário para cadastrar o imóvel');
  }
}
