import { Module } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../role/role.model";
import { Scope } from "./scope.model";
import { RoleScope } from "./scope-role.model";
import { ScopeController } from "./scope.controller";

@Module({
  controllers: [ScopeController],
  providers: [ScopeService],
  imports: [
    SequelizeModule.forFeature([Role, Scope, RoleScope]),
  ]
})
export class ScopeModule {}
