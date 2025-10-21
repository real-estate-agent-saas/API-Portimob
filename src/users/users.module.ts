import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Database
import { User, userSchema } from './infra/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './infra/repositories/user.repository';

// Use Cases
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { FindAllUseCase } from './application/use-cases/find-all-user.usecase';
import { FindOneUseCase } from './application/use-cases/find-one-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindAllUseCase,
    FindOneUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      }
    ]),
  ],
})
export class UsersModule {}
