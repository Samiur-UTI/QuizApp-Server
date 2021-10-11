import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() userLoginDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const { email, password } = userLoginDto;
    const response = await this.authService.validateUser(email, password);
    if (response.bool) {
      // res.json({ message: 'Auth is successfull' });
      const token = await this.authService.initiateToken(response.user);
      res.json(token);
    } else {
      throw new BadRequestException('Invalid Credentials');
    }
  }
}
