import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../../role/role.model";
import { User } from "./user.model";

@Table({tableName: "user_roles", createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, primaryKey: true})
    roleId: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, primaryKey: true})
    userId: number
}
