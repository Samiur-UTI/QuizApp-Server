import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //Get all users
  @Get()
  async fetchAll(): Promise<any> {
    const response = await this.userService.fetchUsers();
    return response;
  }
  // Get a single user
  @Get(':id')
  async fetchUser(@Param('id') param: string): Promise<any> {
    console.log(param);
    const response = await this.userService.fetchUser(param);
    return response;
  }
  //Delete a user
  @Delete(':id/delete')
  async deleteUser(@Param('id') param: string): Promise<any> {
    const response = await this.userService.deleteUser(param);
    console.log(response);
  }
  //Create a new user
  @Post('signup')
  async addUser(@Body() insertUser: CreateUserDto): Promise<any> {
    const { firstName, lastName, email, password } = insertUser;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const response = await this.userService.insertUser(
      firstName,
      lastName,
      email,
      hash,
    );
    return response;
  }
  //   //Login
  //   @Post('login')
  //   async login(@Body() login: LoginUserDto): Promise<any> {
  //     const { email, password } = login;
  //     const response = await this.authService.validateUser(email, password);
  //     if(response){

  //     }
  //   }
  //Update user info
  @Put(':id/update')
  async updateUser(
    @Param('id') param: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<any> {
    const response = await this.userService.updateUser(param, updateUser);
    return response;
  }
}
