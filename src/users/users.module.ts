import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { HttpModule } from "@nestjs/axios";
@Module({
    imports: [HttpModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UsersModule { 
    
}