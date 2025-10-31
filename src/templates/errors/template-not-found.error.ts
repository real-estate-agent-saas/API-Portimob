import { NotFoundError } from 'src/core/errors/types/not-found.error';

/**
 * Thrown when a Template could not be found in the repository.
 */
export class TemplateNotFoundError extends NotFoundError {
  constructor(metadata?: Record<string, any>) {
    super('Template não encontrado.', metadata);
  }
}
