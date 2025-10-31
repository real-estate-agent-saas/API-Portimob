import { ValidationError } from "src/core/errors/types/validation.error";

export class InvalidSlugError extends ValidationError {
  constructor(message?: string, metadata?: Record<string, any>) {
    super('O slug fornecido é inválido.', metadata);
  }
}
