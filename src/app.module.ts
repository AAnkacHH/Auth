import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./user/models/user.model";
import { ScopeModule } from './scope/scope.module';
import { RoleModule } from './role/role.module';
import { GroupModule } from './group/group.module';
import { TokenModule } from './token/token.module';
import { ScopeAttributeModule } from './scope-attribute/scope-attribute.module';
import { Role } from "./role/role.model";
import { UserRole } from "./user/models/user-role.model";
import { PortalController } from './portal/portal.controller';
import { PortalModule } from './portal/portal.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRole],
      autoLoadModels: true
    }),
    UserModule,
    ScopeModule,
    RoleModule,
    GroupModule,
    TokenModule,
    ScopeAttributeModule,
    PortalModule,
  ],
})
export class AppModule {

}
