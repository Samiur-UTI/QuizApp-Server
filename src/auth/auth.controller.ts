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
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/login')
  async login(@Body() userLoginDto: LoginUserDto): Promise<any> {
    const { email, password } = userLoginDto;
    const response = await this.authService.validateUser(email, password);
    console.log(response);
  }
}
