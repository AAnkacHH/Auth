import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ConflictException,
    Patch,
    HttpCode,
    NotFoundException
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from "./role.model";
import { CreateRoleRequest } from "./requests/create-role.request";
import { UpdateRoleRequest } from "./requests/update-role.request";
import { AbstractController } from "../common/abstract.controller";

@ApiTags('roles')
@Controller('roles')
export class RoleController extends AbstractController{
    constructor(private readonly roleService: RoleService) {
        super();
    }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'The found records.' })
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a role by id' })
    @ApiResponse({ status: 200, description: 'The found record.' })
    @ApiParam({ name: 'id', required: true, description: 'The role id' })
    async findOne(@Param('id') id): Promise<Role>
    {
        const role = await this.roleService.getRoleById(id);
        if (role === null) {
            this.sendNotFound('Role', [id]);
        }
        return role;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    create(@Body() roleDto: CreateRoleRequest): Promise<Role>
    {
        return this.roleService.create(roleDto);
    }

    @Patch(':roleId')
    @HttpCode(204)
    @ApiOperation({ summary: 'Update a role' })
    @ApiResponse({ status: 204, description: 'The record has been successfully updated.'})
    async update(@Param('roleId') roleId: number, @Body() roleDto: UpdateRoleRequest): Promise<void>
    {
        let role = await this.roleService.getRoleById(roleId);
        if (role === null) {
            throw new NotFoundException('Role with id: ' + roleId  + ' not found.');
        }

        const res = await this.roleService.update(role, roleDto);
        if (res === false) {
            throw new ConflictException('Role with id: ' + roleId  + ' can not be updated.');
        }
    }

    @Delete(':roleId')
    @ApiOperation({summary: 'Delete a role'})
    @HttpCode(204)
    @ApiResponse({status: 204, description: 'The record has been successfully deleted.'})
    @ApiParam({name: 'roleId', required: true, description: 'The role id'})
    remove(@Param('roleId') roleId): Promise<void>
    {
        return this.roleService.remove(roleId);
    }
}