import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorDto } from 'src/auth/dto/error.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async fetchUsers(): Promise<Array<User>> {
    const response = await this.userModel.find();
    return response;
  }
  async fetchUser(userId: string): Promise<User> {
    const response = await this.userModel.findById(userId);
    if (response) {
      return response;
    }
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
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email)) {
      const checker = await this.fetchUsers();
      const exists = checker.filter((user) => user.email === newUser.email);
      if (!exists.length) {
        const response = await newUser.save();
        return response.id;
      } else {
        return 'Email already exists';
      }
    } else {
      return 'Invalid email address';
    }
  }
  async updateUser(
    userId: string,
    user: UpdateUserDto,
  ): Promise<User | string> {
    const { email } = user;
    if (email) {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (re.test(email)) {
        const checker = await this.fetchUsers();
        const exists = checker.filter((users) => users.email === user.email);
        if (!exists.length) {
          const response = await this.userModel.findByIdAndUpdate(userId, user);
          return response;
        } else {
          return 'Email address already in use';
        }
      } else {
        return 'Invalid email address' ;
      }
    } else {
      const response = await this.userModel.findByIdAndUpdate(userId, user);
      return response;
    }
  }
}
