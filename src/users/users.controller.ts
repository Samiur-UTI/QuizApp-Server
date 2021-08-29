import { Controller,Post,Body, Get } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {

    }
    // @Get()
    // fetchAll():Array<User> {
    //     return this.userService.users
    // }
    @Post()
    async addUser(@Body() insertUser: CreateUserDto): Promise<any>{
        const {firstName,lastName,email,password} = insertUser;
        const response = await this.userService.insertUser(firstName, lastName, email, password)
        return response
    }
}