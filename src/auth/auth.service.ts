import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const users = await this.usersService.fetchUsers();
    const user = users.filter((user) => user.email === email);
    if (user) {
      try {
        const bool = await bcrypt.compare(password, user[0].password);
        return bool;
      } catch (error) {
        return false;
      }
    } else {
      throw new Error(`No user found`);
    }
  }
}
