import { ApiProperty } from "@nestjs/swagger";

export class CreateScopeRequest {
    @ApiProperty({ example: 'Admin', description: 'The name of the Role.' })
    name: string|null;

    @ApiProperty({ example: 'some description', description: 'The description of the Role.', nullable: true })
    description: string|null;

    @ApiProperty({ example: 'WRITE', description: 'The operation of the scope. Can be one of WRITE, READ, EXECUTE'})
    operation: string|null;
}