import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    async insertUser(firstName: string, lastName: string,email: string,password: string): Promise<any> {
        const newUser = new this.userModel({firstName, lastName, email, password});
        const response = await newUser.save();
        return response.id
    } 

}