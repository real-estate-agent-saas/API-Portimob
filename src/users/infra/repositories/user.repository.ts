import { Injectable } from '@nestjs/common';
import { IUserRepository } from './Iuser.repository';
import { UserEntity } from '../../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Model, isValidObjectId } from 'mongoose';
import { UserMapper } from '../mappers/user.mapper';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userModel.create(
      UserMapper.toDocument(userEntity),
    );
    return UserMapper.toEntity(createdUser);
  }

  async findAll(): Promise<UserEntity[] | []> {
    const users = await this.userModel.find().lean();
    if (!users || users.length === 0) return [];
    return users.map((userObj) => UserMapper.toEntity(userObj));
  }

  async findById(id: string): Promise<UserEntity | null> {
    if (!isValidObjectId(id)) return null;
    const existingUser = await this.userModel.findById(id).lean();
    if (!existingUser) return null;
    return UserMapper.toEntity(existingUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await this.userModel
      .findOne({ email })
      .select('+password')
      .lean()
      .exec();
    if (!existingUser) return null;
    return UserMapper.toEntity(existingUser);
  }

  async update(userEntity: UserEntity): Promise<UserEntity | null> {
    const userDoc = UserMapper.toDocument(userEntity);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userEntity.id,
        { $set: userDoc },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedUser) return null;

    return UserMapper.toEntity(updatedUser);
  }
}
