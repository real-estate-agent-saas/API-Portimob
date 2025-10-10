import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from './Iuser.repository';
import { UserEntity } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel({
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    });

    const savedUser = await createdUser.save();

    return new UserEntity({
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      id: savedUser.id,
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const existingUser = await this.userModel.findById(id).exec();

    if (!existingUser) {
      throw new NotFoundException('Nenhum usuário encontrado!');
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (!existingUser) return null;

    return new UserEntity({
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
      id: existingUser.id,
    });
  }

  async findBySlug(slug: string): Promise<UserEntity | null> {
    return null;
  }
}
