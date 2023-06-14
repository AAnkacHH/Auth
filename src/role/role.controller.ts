import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from "./role.model";
import { CreateRoleRequest } from "./requests/create-role.request";
import { UpdateRoleRequest } from "./requests/update-role.request";

@ApiTags('roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

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
    findOne(@Param('id') id): Promise<Role> {
        return this.roleService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    create(@Body() roleDto: CreateRoleRequest): Promise<Role> {
        return this.roleService.create(roleDto);
    }

    @Put()
    @ApiOperation({ summary: 'Update a role' })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    update(@Body() roleDto: UpdateRoleRequest): Promise<Role> {
        return this.roleService.update(roleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a role' })
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiParam({ name: 'id', required: true, description: 'The role id' })
    remove(@Param('id') id): Promise<void> {
        return this.roleService.remove(id);
    }
}