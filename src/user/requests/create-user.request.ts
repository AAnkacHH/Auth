import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequest {
  @ApiProperty({example: 'ankach', description: 'Unique username'})
  readonly username: string;

  @ApiProperty({example: 'ankach.work@gmail.com', description: 'User email'})
  readonly email: string;

  @ApiProperty({example: 'password', description: 'User password'})
  readonly password: string;

  @ApiProperty({example: 'Michal', description: 'User firstname'})
  readonly firstname: string;

  @ApiProperty({example: 'Novak', description: 'User lastname'})
  readonly lastname: string;
}