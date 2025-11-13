import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user-schema';


@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(username: string, password: string): Promise<User> {
    const user = new this.userModel({ username, password });
    return user.save();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
  async findAll(): Promise<User[] | null> {
    return this.userModel.find();
  }
}
