import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RoleService } from "../role/role.service";
import { AbstractController } from "../common/abstract.controller";

@ApiTags('Users')
@Controller('users')
export class UserRoleController extends AbstractController {
    constructor(private userService: UserService, private roleService: RoleService) {
        super();
    }


    @ApiOperation({summary: 'Adds a new role to a user.'})
    @ApiResponse({status: 204})
    @ApiResponse({status: 404, description: 'User or role was not found'})
    @Post('/:userId/roles/:roleId')
    async addRoleToUser(@Param('userId') userId: number,  @Param('roleId') roleId: number): Promise<void>
    {
        let user = await this.userService.getUserById(userId);
        let role = await this.roleService.getRoleById(roleId);
        if (user === null || role === null) {
            this.sendNotFound('User or role ', [userId, roleId]);
        }
        await user.$add('roles', role);
    }

    @ApiOperation({summary: 'Removes a role from a user.'})
    @ApiResponse({status: 204})
    @ApiResponse({status: 404, description: 'User or role was not found'})
    @Delete('/:userId/roles/:roleId')
    async removeRoleFromUser(@Param('userId') userId: number,  @Param('roleId') roleId: number): Promise<void>
    {
        let user = await this.userService.getUserById(userId);
        let role = await this.roleService.getRoleById(roleId);
        if (user === null || role === null) {
            this.sendNotFound('User or role ', [userId, roleId]);
        }
        await user.$remove('roles', role);
    }
}
