import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@backend/shared-types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel({
      ...item.toObject()
    })

    return newUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async findAdmin(): Promise<User | null> {
    return this.userModel
      .findOne({isAdmin: true})
      .exec();
  }
}
