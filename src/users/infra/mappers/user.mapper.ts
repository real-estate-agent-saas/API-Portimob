import { UserDocument, User } from '../schemas/users.schema';
import { UserEntity } from '../../entities/user.entity';

export class UserMapper {
  // Converts UserDocument into UserEntity when fetch DB
  public static toEntity(document: UserDocument): UserEntity {
    return UserEntity.create({
      id: document._id?.toString(),
      name: document.name,
      email: document.email,
      password: document.password,
    });
  }

  // Converts UserEntity into UserDocument to save on DB
  public static toDocument(entity: UserEntity): User {
    const user: User = {
      name: entity.name,
      email: entity.email,
      password: entity.password,
    };
    return user;
  }
}
