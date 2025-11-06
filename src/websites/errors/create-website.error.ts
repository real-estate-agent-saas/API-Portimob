import { InternalError } from "src/core/errors/types/internal.error";

export class WebsiteCreateError extends InternalError {
  constructor(metadata?: Record<string, any>) {
    super('Falha ao criar o website.', metadata);
  }
}
