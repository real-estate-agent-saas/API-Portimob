import { Injectable } from '@nestjs/common';
import { IUserRepository } from './Iuser.repository';
import { UserEntity } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Model, isValidObjectId } from 'mongoose';
import { UserMapper } from '../repositories/user.mapper';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel({
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.passwordHash,
    });
    const savedUser = await createdUser.save();
    return UserMapper.toEntity(savedUser);
  }

  async findAll(): Promise<UserEntity[] | []> {
    const users = await this.userModel.find();
    if (!users || users.length === 0) return [];
    return users.map((userDoc) => UserMapper.toEntity(userDoc));
  }

  async findById(id: string): Promise<UserEntity | null> {
    if (!isValidObjectId(id)) return null;
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) return null;
    return UserMapper.toEntity(existingUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (!existingUser) return null;
    return UserMapper.toEntity(existingUser);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    if (!isValidObjectId(id)) return null;
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true, runValidators: true },
    );

    if (!updatedUser) return null;

    return UserMapper.toEntity(updatedUser);
  }
}
