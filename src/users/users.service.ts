import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
@Injectable()
export class UserService {
    users: User[] = [];
    insertUser(firstName: string, lastName: string,email: string,password: string): void {
        const newUser = new User(firstName, lastName, email, password);
        this.users.push(newUser);
    } 
}