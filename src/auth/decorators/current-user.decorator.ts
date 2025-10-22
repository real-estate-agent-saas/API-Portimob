import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthRequest } from '../models/AuthRequest';

// Decorator used to access authenticated user anywhere in the code
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
