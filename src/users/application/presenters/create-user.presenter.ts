import { UserEntity } from '../../entities/user.entity';

export class CreateUserPresenter {
  static toHttp(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
