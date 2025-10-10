import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Database
import { userSchema, User } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';

// Use Cases
import { UsersService } from './users.service';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { FindAllUseCase } from './application/use-cases/find-all.usercase';
import { FindOneUseCase } from './application/use-cases/find-one.usercase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUseCase,
    UpdateUserUseCase,
    FindAllUseCase,
    FindOneUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  imports: [ MongooseModule.forFeature([{
    name: User.name,
    schema: userSchema,
  }]) ],
})
export class UsersModule {}
