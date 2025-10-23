import { DomainError } from './domain.error';
/**
 * Represents validation failures within the domain.
 * Example: invalid title, negative price, mandatory field, etc.
 */
export class ValidationError extends DomainError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, metadata);
  }
}
