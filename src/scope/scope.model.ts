import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../role/role.model";
import { RoleScope } from "./scope-role.model";

interface ScopeCreationAttrs {
    name: string;
    description: string|null;
    operation: string;
}

@Table({tableName: "scopes"})
export class Scope extends Model<Scope, ScopeCreationAttrs> {
    @ApiProperty({ example: 1, description: 'The unique ID of the Scope.' })
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    scopeId: number;

    @ApiProperty({ example: 'Admin', description: 'The name of the Scope.', nullable: true })
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({ example: 'some description', description: 'The description of the Scope.', nullable: true })
    @Column({type: DataType.STRING, allowNull: true})
    description: string|null;

    @ApiProperty({ example: 'WRITE', description: 'The scope operation.', nullable: true })
    @Column({type: DataType.STRING})
    operation: string;

    @ApiProperty({example: [Role], description: "User roles.", nullable: false})
    @BelongsToMany(() => Role, () => RoleScope)
    roles: Role[];
}
