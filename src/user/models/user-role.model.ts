import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserRoleCreationAttrs {
    userId: number;
    roleId: number;
}

@Table({tableName: "user_roles"})
export class UserRole extends Model<UserRole, UserRoleCreationAttrs> {
    // todo
}
