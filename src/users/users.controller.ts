import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //Get all users
  @Get()
  async fetchAll(): Promise<any> {
    const response = await this.userService.fetchUsers();
    return response;
  }
  // Get a single user profile
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async fetchUser(@Param('id') param: string): Promise<any> {
    console.log(param);
    const response = await this.userService.fetchUser(param);
    return response;
  }
  //Delete a user profile
  @UseGuards(JwtAuthGuard)
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
  //Update user info
  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async updateUser(
    @Param('id') param: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<any> {
    const response = await this.userService.updateUser(param, updateUser);
    return response;
  }
}
