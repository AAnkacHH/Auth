import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRequest {

    @ApiProperty({example: 'ankach.work@gmail.com', description: 'User email', nullable: true})
    readonly email: string|null;

    @ApiProperty({example: 'password', description: 'User password', nullable: true})
    readonly password: string|null;

    @ApiProperty({example: 'Michal', description: 'User firstname', nullable: true})
    readonly firstname: string|null;

    @ApiProperty({example: 'Novak', description: 'User lastname', nullable: true})
    readonly lastname: string|null;
}