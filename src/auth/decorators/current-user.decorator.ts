import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthRequest } from '../models/AuthRequest';

// Esse decorator é usado para acessar o usuário autenticado em qualquer lugar do código
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
