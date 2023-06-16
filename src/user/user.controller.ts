import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get, HttpCode,
    NotFoundException,
    Param, Patch,
    Post
} from "@nestjs/common";
import { CreateUserRequest } from "./requests/create-user.request";
import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserRequest } from "./requests/update-user.request";

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({summary: 'User creation.'})
    @ApiResponse({status: 201, type: User})
    @Post()
    createUser(@Body() createUserRequest: CreateUserRequest): Promise<User>
    {
        return this.userService.createUser(createUserRequest)
            .then((user) => {return user}, (existingUser) => {
                console.log(existingUser.id);
                throw new ConflictException({
                    'error': 'User with current username already exists.',
                    'username': existingUser.username,
                    'user_id': existingUser.userId,
                });
            });
    }

    @ApiOperation({summary: 'Getting all users.'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers(): Promise<User[]>
    {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Getting concrete user.'})
    @Get('/:userId')
    getUser(@Param('userId') userId: number): Promise<User|void>
    {
        return this.userService.getUserById(userId)
            .then((user) => {
                if (user === null) {
                    throw new NotFoundException("User not found");
                }
                return user;
            }
        )
    }

    @ApiOperation({summary: 'Updating concrete user.'})
    @ApiResponse({ status: 204, description: 'The user was updated successfully.'})
    @ApiResponse({ status: 404, description: 'The user can not be found.'})
    @ApiResponse({ status: 409, description: 'The user can not be updated.'})
    @Patch('/:userId')
    @HttpCode(204)
    async updateUser(@Param('userId') userId: number, @Body() updateUserRequest: UpdateUserRequest): Promise<User>
    {
        return this.userService.getUserById(userId)
            .then((user) => {
                if (user === null) {
                    return Promise.reject();
                }
                return this.userService.updateUser(user, updateUserRequest);
            })
            .then((result) => {
                if (result === false) {
                    throw new ConflictException();
                }
                return null;
            }, () => {throw new NotFoundException()});
    }

    @ApiOperation({summary: 'Deleting concrete user.'})
    @ApiResponse({ status: 204, description: 'The user was deleted successfully.'})
    @ApiResponse({ status: 404, description: 'The user can not be found.'})
    @ApiResponse({ status: 409, description: 'The user can not be deleted.'})
    @Delete('/:userId')
    @HttpCode(204)
    async removeUser(@Param('userId') userId: number)
    {
        return this.userService.getUserById(userId)
            .then((user) => {
                if (user === null) {
                    return Promise.reject();
                }
                return this.userService.deleteUserById(user.userId);
            })
            .then((result) => {
                if (result === false) {
                    throw new ConflictException();
                }
                return null;
            }, () => {throw new NotFoundException()});
    }
}
