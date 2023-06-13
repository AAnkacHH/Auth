import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./user/user.model";
import { RoleController } from './role/role.controller';
import { GroupController } from './group/group.controller';
import { TokenController } from './token/token.controller';
import { ScopeController } from './scope/scope.controller';
import { ScopeModule } from './scope/scope.module';
import { RoleModule } from './role/role.module';
import { GroupModule } from './group/group.module';
import { TokenModule } from './token/token.module';

@Module({
  controllers: [RoleController, GroupController, TokenController, ScopeController],
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
      models: [User],
      autoLoadModels: true
    }),
    UserModule,
    ScopeModule,
    RoleModule,
    GroupModule,
    TokenModule,
  ],
})
export class AppModule {

}
