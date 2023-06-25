import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from "./role.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./role.model";
import { UserRole } from "../user/models/user-role.model";
import { User } from "../user/models/user.model";
import { Scope } from "../scope/scope.model";
import { RoleScope } from "../scope/scope-role.model";

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    SequelizeModule.forFeature([Role, UserRole, User, Scope, RoleScope])
  ],
  exports: [
      RoleService
  ]
})
export class RoleModule {}
