import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Scope } from "./scope.model";
import { CreateScopeRequest } from "./requests/create-scope.request";

@Injectable()
export class ScopeService {
    constructor(
        @InjectModel(Scope)
        private scopeModel: typeof Scope,
    ) {}

    async create(scope: CreateScopeRequest) {
        return this.scopeModel.create(scope);
    }

    async findAll(): Promise<Scope[]> {
        return this.scopeModel.findAll();
    }

    async findById(id: number): Promise<Scope> {
        return this.scopeModel.findByPk(id);
    }

    async findByName(name: string)
    {
        return this.scopeModel.findOne({where: {name: name}});
    }

    async update(scope: Scope, scopeRequest: CreateScopeRequest)
    {
        scope.name = scopeRequest.name || scope.name;
        scope.description = scopeRequest.description || scope.description;
        scope.operation = scopeRequest.operation || scope.operation;

        await this.scopeModel.update(scope, {
            where: { scopeId: scope.scopeId },
        });
    }

    async delete(scope: Scope)
    {
        await scope.destroy();
    }
}
