import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserRole } from "./models/user-role.model";
import { Role } from "../role/role.model";
import { RoleModule } from "../role/role.module";
import { UserRoleController } from "./user-role.controller";

@Module({
  controllers: [UserController, UserRoleController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, UserRole, Role]),
      RoleModule
  ]
})
export class UserModule {}
