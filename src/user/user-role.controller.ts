import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, ConflictException, Controller, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RoleService } from "../role/role.service";
import { User } from "./models/user.model";
import { CreateUserRequest } from "./requests/create-user.request";
import { AbstractController } from "../common/abstract.controller";

@ApiTags('Users')
@Controller('users')
export class UserRoleController extends AbstractController{
    constructor(private userService: UserService, private roleService: RoleService) {
        super();
    }


    @ApiOperation({summary: 'User creation.'})
    @ApiResponse({status: 201, type: User})
    @Post('/:userId/roles/:roleId')
    async addRoleToUser(@Param('userId') userId: number,  @Param('roleId') roleId: number): Promise<void>
    {
        let user = await this.userService.getUserById(userId);
        let role = await this.roleService.getRoleById(roleId);
        if (user === null || role === null) {
            this.sendNotFound('User or role ', [userId, roleId]);
        }


    }

}
