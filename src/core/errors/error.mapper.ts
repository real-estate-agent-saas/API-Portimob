import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { DomainError } from './domain.error';
import { ValidationError } from './validation.error';
import { NotFoundError } from './not-found.error';
import { ForbiddenError } from './forbidden.error';

/**
 * Converts domain errors to NestJS HTTP exceptions.
 */
export class ErrorMapper {
  static toHttp(error: Error): HttpException {
    // 400 - Validation errors    i
    if (error instanceof ValidationError) {
      return new BadRequestException({
        statusCode: 400,
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
