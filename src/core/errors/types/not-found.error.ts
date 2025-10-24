import { DomainError } from './domain.error';

/**
 * Represents cases where an entity was not found.
 * Example: non-existent property, user not found, etc.
 * */
export class NotFoundError extends DomainError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, metadata);
  }
}
