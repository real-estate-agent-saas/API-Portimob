import { DomainError } from './domain.error';
/**
 * Represents error where somenone can't have access to an Entity
 */
export class ForbiddenError extends DomainError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, metadata);
  }
}
