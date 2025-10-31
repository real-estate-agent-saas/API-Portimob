import { UserDocument, User } from '../schemas/users.schema';
import { UserEntity } from '../../entities/user.entity';
import { FlattenMaps } from 'mongoose';

// To cover both Mongoose Document and plain object
type UserSource = FlattenMaps<UserDocument> | User;

export class UserMapper {
  public static toEntity(source: UserSource): UserEntity {
    return UserEntity.create(
      {
        id: source._id?.toString(),
        name: source.name,
        email: source.email,
        password: source.password,
      },
      source.websiteId,
      source.propertyIds,
    );
  }

  public static toDocument(entity: UserEntity): Partial<User> {
    return {
      name: entity.name,
      email: entity.email,
      password: entity.password,
      websiteId: entity.getWebsiteId(),
      propertyIds: entity.getPropertyIds(),
    };
  }
}
