import { InternalError } from "src/core/errors/types/internal.error";

export class WebsiteUpdateError extends InternalError {
  constructor(metadata?: Record<string, any>) {
    super('Falha ao atualizar o website.', metadata);
  }
}
