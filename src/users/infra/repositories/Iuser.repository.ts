import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(userEntity: UserEntity): Promise<UserEntity>;
  update(userEntity: UserEntity): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[] | []>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
