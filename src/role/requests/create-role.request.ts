import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleRequest {
    @ApiProperty({ example: 'Admin', description: 'The name of the Role.' })
    name: string;

    @ApiProperty({ example: 'some description', description: 'The description of the Role.', nullable: true })
    description: string|null;
}