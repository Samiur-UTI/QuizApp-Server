import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/users/users.service';
@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
