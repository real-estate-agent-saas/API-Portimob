import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { DomainError } from '../errors/types/domain.error';
import { ErrorMapper } from '../errors/mapper/error.mapper';

/**
 * Global filter to catch errors and return standardized HTTP responses.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  // Main method to catch exceptions
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpException: HttpException;

    // If it's a domain error, convert it to HttpException
    if (exception instanceof DomainError) {
      httpException = ErrorMapper.toHttp(exception);
    }
    // If it's already a HttpExpeception, throws it
    else if (exception instanceof HttpException) {
      httpException = exception;
    }
    // If it is something unexpected (bug, untreated error)
    else {
      this.logger.error('Erro inesperado capturado:', exception);
      httpException = ErrorMapper.toHttp(new Error('Unexpected error'));
    }

    const status = httpException.getStatus();
    const body = httpException.getResponse();

    // Log the error in the console
    this.logger.error(
      JSON.stringify({
        status,
        method: request.method,
        path: request.originalUrl,
        error:
          exception instanceof Error
            ? {
                name: exception.name,
                message: exception.message,
                metadata: (exception as any).metadata,
              }
            : String(exception),
      }),
    );

    response.status(status).json(body);
  }
}
