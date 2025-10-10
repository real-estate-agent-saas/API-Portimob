import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserRepository } from './repositories/user.repository';
import { userSchema, User } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserUseCase,
    UpdateUserUseCase,
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
