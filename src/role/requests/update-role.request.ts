import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType } from "sequelize-typescript";

export class UpdateRoleRequest {
    @ApiProperty({ example: 'Admin', description: 'The name of the Role.', nullable: true })
    name: string;

    @ApiProperty({ example: 'some description', description: 'The description of the Role.', nullable: true })
    description: string|null;
}