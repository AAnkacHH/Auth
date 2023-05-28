import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserRequest } from "./requests/create-user.request";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'User creation.'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() createUserRequest: CreateUserRequest): Promise<User>
    {
        return this.userService.createUser(createUserRequest);
    }

    @ApiOperation({summary: 'Getting all users.'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers(): Promise<User[]>
    {
        return this.userService.getAllUsers();
    }

    @Get('/:userId')
    getUser(@Param('userId') userId: number): Promise<User>
    {
        return this.userService.getUserById(userId);
    }

    @Delete('/:userId')
    removeUser(@Param('userId') userId: number): void
    {
        const userPromise = this.userService.getUserById(userId);
        userPromise.then((user) => {
            const res = this.userService.deleteUserById(userId);
           // todo
        }, () => {
            // user not found.
        } )
    }
}
