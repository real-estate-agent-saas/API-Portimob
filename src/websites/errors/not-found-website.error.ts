import { NotFoundError } from 'src/core/errors/types/not-found.error';

/**
 * Thrown when a Website entity could not be found in the repository.
 */
export class WebsiteNotFoundError extends NotFoundError {
  constructor(metadata?: Record<string, any>) {
    super('Website não encontrado.', metadata);
  }
}
