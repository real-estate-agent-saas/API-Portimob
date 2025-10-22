import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import type { Response } from 'express';
import { SignInUseCase } from './use-cases/sign-in.usecase';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @IsPublic()
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signIn(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.signInUseCase.excecute(req.user, res);
  }

  @Post('signOut')
  @HttpCode(HttpStatus.OK)
  signOut() {
    return 'Logout';
  }
}
