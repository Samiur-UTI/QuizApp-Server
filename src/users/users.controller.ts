import { Controller,Post,Body } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {

    }
    @Post('/users')
    addUser(@Body('firstName') userFirstName: string, 
            @Body('lastName') userLastName: string, 
            @Body('email') email: string, 
            @Body('password') password: string) 
            : any{
            this.userService.insertUser(userFirstName, userLastName, email, password);
    }
}