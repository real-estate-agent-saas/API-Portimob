import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/infra/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/infra/schemas/users.schema';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { SignInUseCase } from './use-cases/sign-in.usecase';
import { ValidateUserUseCase } from './use-cases/validate-user.usecase';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') as any,
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    SignInUseCase,
    ValidateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('signIn');
  }
}
