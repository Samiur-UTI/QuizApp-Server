import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async fetchUsers(): Promise<Array<User>> {
    const response = await this.userModel.find();
    return response;
  }
  async fetchUser(userId: string): Promise<User> {
    const response = await this.userModel.findById(userId);
    return response;
  }
  async deleteUser(userId: string): Promise<any> {
    const response = await this.userModel.findByIdAndDelete(userId);
    return response;
  }
  async insertUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<string> {
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password,
    });
    const response = await newUser.save();
    return response.id;
  }
  async updateUser(userId: string, user: UpdateUserDto): Promise<any> {
    const response = await this.userModel.findByIdAndUpdate(userId, user);
    return response;
  }
}
