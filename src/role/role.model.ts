import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';

interface RoleCreationAttrs {
    name: string;
    description: string|null;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: 1, description: 'The unique ID of the Role.' })
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    roleId: number;

    @ApiProperty({ example: 'Admin', description: 'The name of the Role.', nullable: true })
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({ example: 'some description', description: 'The description of the Role.', nullable: true })
    @Column({type: DataType.STRING, allowNull: false})
    description: string|null;
}
