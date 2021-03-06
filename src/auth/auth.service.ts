import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(email)) {
      const users = await this.usersService.fetchUsers();
      const user = users.filter((user) => user.email === email);
      if (user.length) {
        try {
          const bool = await bcrypt.compare(password, user[0].password);
          return {
            user,
            bool,
          };
        } catch (error) {
          return false;
        }
      } else {
        return {
          bool: false,
        };
      }
    } else {
      return {
        bool: false,
      };
    }
  }

  async initiateToken(user: User[]) {
    const { id, email } = user[0];
    return {
      accessToken: this.jwtService.sign({ id, email }),
    };
  }
}
