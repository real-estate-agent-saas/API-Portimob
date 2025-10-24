import { ValidationError } from "src/core/errors/types/validation.error";

/**
 * Specific error for validations inside the entity
 * Used when validation of a property fails (e.g. negative price, short title).
 */
export class InvalidPropertyError extends ValidationError {
  constructor(field?: string, message?: string) {
    super(`Erro no campo "${field}": ${message}`, { field });
  }
}
