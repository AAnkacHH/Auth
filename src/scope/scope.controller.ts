import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Scope } from "./scope.model";
import { ScopeService } from "./scope.service";
import { AbstractController } from "../common/abstract.controller";
import { CreateScopeRequest } from "./requests/create-scope.request";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../user/models/user.model";

@ApiTags('Scopes')
@Controller('scopes')
export class ScopeController extends AbstractController {
    constructor(private readonly scopeService: ScopeService) {
        super();
    }

    @ApiOperation({summary: 'Scope creation.'})
    @ApiResponse({status: 201, type: User})
    @ApiResponse({status: 409, description: 'Scope with current name already exists.'})
    @Post()
    async create(@Body() scopeRequest: CreateScopeRequest) {
        let scope = await this.scopeService.findByName(scopeRequest.name);
        if (scope !== null) {
            this.sendConflict({
                'error': 'Scope with current name already exists.',
                'username': scope.name,
                'user_id': scope.scopeId,
            });
        }

        return this.scopeService.create(scopeRequest);
    }

    @Get()
    findAll(): Promise<Scope[]> {
        return this.scopeService.findAll();
    }

    @Get(':scopeId')
    findOne(@Param('scopeId') scopeId: string): Promise<Scope> {
        return this.scopeService.findById(+scopeId);
    }

    @Patch(':scopeId')
    async update(@Param('scopeId') scopeId: string, @Body() updateRequest: CreateScopeRequest) {
        const scope = await this.scopeService.findById(+scopeId);
        if (scope === null) {
            this.sendNotFound('Scope', [+scopeId]);
        }
        return this.scopeService.update(scope, updateRequest);
    }

    @Delete(':scopeId')
    async delete(@Param('scopeId') scopeId: string): Promise<void>
    {
        const scope = await this.scopeService.findById(+scopeId);
        if (scope === null) {
            this.sendNotFound('Scope', [+scopeId]);
        }
        return this.scopeService.delete(scope);
    }
}

