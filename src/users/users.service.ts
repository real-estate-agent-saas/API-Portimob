import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  User: UserEntity[] = [
    {
      name: 'Ricardo Hemmel',
      email: 'ricardo@hotmail.com',
      passwordHash: 'Teste123@',
    },
  ];

  create(createUserDto: CreateUserDto) {
    this.User.push(createUserDto);
    return this.User.at(-1);
  }

  findAll() {
    return this.User;
  }

  findOne(id: string) {
    const foundUser = this.User.find((user) => user.name === id);

    if (foundUser) {
      return `Usuário encontrado ${(foundUser.email, foundUser.name)}`;
    }

    return 'Nenhum usuário encontrado';
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let updatedUser = this.User.find((user) => user.name === id);

    if (updatedUser) {
      Object.assign(updatedUser, updateUserDto);
      return `Usuário atualizado: ${(updatedUser.name, updatedUser.email)}`;
    }

    return 'Nenhum usuário encontrado';
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
