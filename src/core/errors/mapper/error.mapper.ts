import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DomainError } from '../types/domain.error';
import { ValidationError } from '../types/validation.error';
import { NotFoundError } from '../types/not-found.error';
import { ForbiddenError } from '../types/forbidden.error';
import { UnauthorizedError } from '../types/unauthorized.error';
import { InternalError } from '../types/internal.error';

/**
 * Converts domain errors to NestJS HTTP exceptions.
 */
export class ErrorMapper {
  static toHttp(error: Error): HttpException {
    // 400 - Validation errors
    if (error instanceof ValidationError) {
      return new BadRequestException({
        statusCode: 400,
        error: error.name,
        message: error.message,
        metadata: (error as DomainError).metadata,
      });
    }

    // 401 - Unauthorized access
    if (error instanceof UnauthorizedError) {
      return new UnauthorizedException({
        statusCode: 401,
        error: error.name,
        message: error.message,
        metadata: (error as DomainError).metadata,
      });
    }

    // 404 - Resource not found
    if (error instanceof NotFoundError) {
      return new NotFoundException({
        statusCode: 404,
        error: error.name,
        message: error.message,
        metadata: (error as DomainError).metadata,
      });
    }

    // 403 - Permission error
    if (error instanceof ForbiddenError) {
      return new ForbiddenException({
        statusCode: 403,
        error: error.name,
        message: error.message,
        metadata: (error as DomainError).metadata,
      });
    }

    //If no error fits the validations, a generic system error is thrown.
    // 500 - Unexpected errors
    if (error instanceof InternalError) {
      return new HttpException(
        {
          statusCode: 500,
          error: error.name,
          message: error.message,
          metadata: (error as DomainError).metadata,
        },
        500,
      );
    }

    // Default fallback
    return new HttpException(
      {
        statusCode: 500,
        error: 'InternalServerError',
        message: 'Ocorreu um erro inesperado.',
      },
      500,
    );
  }
}
