import { UserDocument, User } from '../schemas/users.schema';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  // Converts UserEntity into UserDocument to save on DB
  public static toDocument(entity: UserEntity): User {
    const user: User = {
      name: entity.name,
      email: entity.email,
      password: entity.passwordHash,
      publicEmail: entity.publicEmail,
      whatsapp: entity.whatsapp,
      phone: entity.phone,
      instagram: entity.instagram,
      facebook: entity.facebook,
      linkedin: entity.linkedin,
      profileImage: entity.profileImage,
      bio: entity.bio,
      careerStartDate: entity.careerStartDate,
      creci: entity.creci,
      gender: entity.gender,
      isActive: entity.isActive,
      specialties: entity.specialties,
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
      document.publicEmail,
      document.whatsapp,
      document.phone,
      document.instagram,
      document.facebook,
      document.linkedin,
      document.profileImage,
      document.bio,
      document.careerStartDate,
      document.creci,
      document.gender,
      document.isActive,
      document.specialties,
      document.propertyIds,
      document.dynamicWebsiteId,
    );
  }
}
