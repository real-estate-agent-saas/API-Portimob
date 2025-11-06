import { ValidationError } from "src/core/errors/types/validation.error";

export class InvalidUserError extends ValidationError {
  constructor(field?: string, message?: string) {
    super(`Erro no campo "${field}": ${message}`, { field });
  }
}
