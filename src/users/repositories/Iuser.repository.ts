import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(userEntity: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  
  findById(id: string): Promise<UserEntity | null>;


  findBySlug(slug: string): Promise<UserEntity | null>;
}
