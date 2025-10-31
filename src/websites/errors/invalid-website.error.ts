import { ValidationError } from "src/core/errors/types/validation.error";

export class InvalidWebsiteError extends ValidationError {
  constructor(message: string, metadata?: Record<string, any>) {
    super(message, metadata);
  }
}
