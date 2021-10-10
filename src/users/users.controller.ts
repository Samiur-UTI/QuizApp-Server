import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //Get all users
  @Get()
  async fetchAll(
    @Req() request: Request,
    @Param() params: string,
  ): Promise<any> {
    // console.log(request);
    // console.log(params);
    const response = await this.userService.fetchUsers();
    return response;
  }
  // Get a single user
  @Get(':id/delete')
  async fetchUser(@Param('id') param: string): Promise<any> {
    console.log(param);
    const response = await this.userService.fetchUser(param);
    return response;
  }
  //Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') param: string): Promise<any> {
    const response = await this.userService.deleteUser(param);
    console.log(response);
  }
  //Create a new user
  @Post()
  async addUser(@Body() insertUser: CreateUserDto): Promise<any> {
    const { firstName, lastName, email, password } = insertUser;
    const response = await this.userService.insertUser(
      firstName,
      lastName,
      email,
      password,
    );
    return response;
  }
  //Update user info
  @Put(':id/update')
  async updateUser(
    @Param('id') param: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<any> {
    const response = await this.userService.updateUser(param, updateUser);
  }
}
