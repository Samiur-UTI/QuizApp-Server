import { Controller,Post,Body, Get,Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request } from "express";
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    async fetchAll(@Req() request: Request):Promise<any> {
        console.log(request);
        const response = await this.userService.fetchUsers()
        return response
    }
    @Post()
    async addUser(@Body() insertUser: CreateUserDto): Promise<any>{
        const {firstName,lastName,email,password} = insertUser;
        const response = await this.userService.insertUser(firstName, lastName, email, password)
        return response
    }
}