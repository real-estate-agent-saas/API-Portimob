import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginRequestBody } from '../models/LoginRequestBody';
import { validate } from 'class-validator';

@Injectable()
// Responsible Middleware for validating the body of the login request to avoid making invalid requests for nothing.
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    // Checks whether the request body contains the required fields
    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    // If there are validations, throw a BadRequestException exception with error messages
    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [
            ...acc,
            ...(curr.constraints ? Object.values(curr.constraints) : []),
          ];
        }, []),
      );
    }
    // If there are no validations, call the next middleware or route
    next();
  }
}
