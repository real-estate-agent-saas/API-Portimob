import { DomainError } from './domain.error';

/**
 * Represents unexpected system-level or internal server errors.
 * Example: database write failure, third-party API error, etc.
 */
export class InternalError extends DomainError {
  constructor(message = 'Erro interno no servidor', metadata?: Record<string, any>) {
    super(message, metadata);
  }
}
