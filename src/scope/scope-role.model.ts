import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../role/role.model";
import { Scope } from "./scope.model";

@Table({tableName: "role_scopes", createdAt: false, updatedAt: false})
export class RoleScope extends Model<RoleScope> {
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, primaryKey: true})
    roleId: number

    @ForeignKey(() => Scope)
    @Column({type: DataType.INTEGER, primaryKey: true})
    scopeId: number
}
