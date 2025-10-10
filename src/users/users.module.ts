import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Database
import { User, userSchema } from './schemas/users.schema';
import { Specialty, specialtySchema } from './schemas/specialties.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';

// Use Cases
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { FindAllUseCase } from './application/use-cases/find-all.usecase';
import { FindOneUseCase } from './application/use-cases/find-one.usecase';
import { SpecialtySeeder } from 'src/seeds/specialty.seeder';

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
    SpecialtySeeder,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: Specialty.name,
        schema: specialtySchema,
      },
    ]),
  ],
})
export class UsersModule {}
