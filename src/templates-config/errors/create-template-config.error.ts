import { InternalError } from 'src/core/errors/types/internal.error';

export class TemplateConfigCreateError extends InternalError {
  constructor(metadata?: Record<string, any>) {
    super('Falha ao criar o configuração do template.', metadata);
  }
}
