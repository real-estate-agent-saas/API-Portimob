import { ForbiddenError } from 'src/core/errors/types/forbidden.error';

/**
 * Specific error for validations inside the entity
 * Used when not the property owner tries to update a property.
 */
export class ForbiddenPropertyUpdate extends ForbiddenError {
  constructor() {
    super(`Você não tem permissão para atualizar o imóvel`);
  }
}
