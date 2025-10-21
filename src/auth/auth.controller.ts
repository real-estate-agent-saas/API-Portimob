import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthRequest } from './models/AuthRequest';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signUp(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
