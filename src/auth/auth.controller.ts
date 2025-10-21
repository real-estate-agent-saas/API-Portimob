import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signUp() {
    return this.signUpUseCase.execute();
  }
}
