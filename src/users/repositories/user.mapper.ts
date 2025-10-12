import { UserDocument, User } from '../schemas/users.schema';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  // Converts UserEntity into UserDocument to save on DB
  public static toDocument(entity: UserEntity): User {
    const user: User = {
      name: entity.name,
      email: entity.email,
      password: entity.passwordHash,
      propertyIds: entity.propertyIds,
      dynamicWebsiteId: entity.dynamicWebsiteId,
    };
    return user;
  }

  // Converts UserDocument into UserEntity when fetch DB
  public static toEntity(document: UserDocument): UserEntity {
    return new UserEntity(
      document.name,
      document.email,
      document.password,
      document._id?.toString(),
      document.propertyIds,
      document.dynamicWebsiteId,
    );
  }
}
