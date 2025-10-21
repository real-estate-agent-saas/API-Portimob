import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/infra/schemas/users.schema';
import { LocalStrategy } from './strategies/local.strategy';
import { ValidateUserUseCase } from './application/use-cases/validate-user.usecase';

@Module({
  providers: [
    AuthService,
    SignUpUseCase,
    LocalStrategy,
    ValidateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
})
export class AuthModule {}
