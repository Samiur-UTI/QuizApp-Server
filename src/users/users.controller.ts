import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from '../auth/dto/user.dto';
import { ErrorDto } from 'src/auth/dto/error.dto';
export interface UserInfo {
  id: string;
  email: string;
}
@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  //Get all users
  @Get()
  async fetchAll(): Promise<User[] | ErrorDto> {
    const response = await this.userService.fetchUsers();
    if (response.length) {
      return response;
    } else {
      return { error: 'Could not fetch all users' };
    }
  }
  // Get a single user profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async fetchUser(@Req() req: Request): Promise<User | ErrorDto> {
    const { id } = req.user as UserInfo;
    const response: User | ErrorDto = await this.userService.fetchUser(id);
    if (response) {
      return response;
    } else {
      return { error: 'No user found' };
    }
  }
  //Delete a user profile
  @UseGuards(JwtAuthGuard)
  @Delete('profile/delete')
  async deleteUser(@Req() req: Request): Promise<{ message: string }> {
    const { id } = req.user as UserInfo;
    const response = await this.userService.deleteUser(id);
    console.log(response);
    if (response) {
      return { message: 'Profile deleted successfully' };
    } else {
      return { message: 'Profile not found' };
    }
  }
  //Create a new user
  @Post('signup')
  async addUser(
    @Body() insertUser: CreateUserDto,
  ): Promise<{ message: string }> {
    const { firstName, lastName, email, password } = insertUser;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    if (firstName && lastName && email && password) {
      const response: string = await this.userService.insertUser(
        firstName,
        lastName,
        email,
        hash,
      );
      return { message: response };
    } else {
      return {
        message: 'Cannot create profile with insufficient credentials',
      };
    }
  }
  //Update user info
  @UseGuards(JwtAuthGuard)
  @Put('profile/update')
  async updateUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateUser: UpdateUserDto,
  ): Promise<{ message: string | User }> {
    const { id } = req.user as UserInfo;
    const response: User | string = await this.userService.updateUser(
      id,
      updateUser,
    );
    if (typeof response !== 'string') {
      return { message: 'Profile update successful' };
    } else {
      return { message: response };
    }
  }
}
