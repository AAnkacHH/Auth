import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface PortalCreationAttrs {
    name: string;
    description: string|null;
}

@Table({tableName: "portals"})
export class Portal extends Model<Portal, PortalCreationAttrs> {
    @ApiProperty({ example: 1, description: 'The unique ID of the Role.' })
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    portalId: number;

    @ApiProperty({ example: 'Admin', description: 'The name of the Role.', nullable: true })
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @ApiProperty({ example: 'some description', description: 'The description of the Role.', nullable: true })
    @Column({type: DataType.STRING, allowNull: true})
    description: string|null;

    @ApiProperty({ example: 'Production', description: 'type of the portal, custom defined, predefined are Production and Test', nullable: false})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;
}