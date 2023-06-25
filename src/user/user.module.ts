import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UserRole } from "./models/user-role.model";
import { Role } from "../role/role.model";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, UserRole, Role])
  ]
})
export class UserModule {}
