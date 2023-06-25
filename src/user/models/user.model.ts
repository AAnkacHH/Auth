import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { UserRole } from "./user-role.model";
import { Role } from "../../role/role.model";

interface UserCreationAttrs {
  username: string;
  email: string;
  password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: 5, description: 'User identifier'})
  @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
  userId: number;


  @ApiProperty({example: 'ankach', description: 'Unique username'})
  @Column({type: DataType.STRING, unique: true})
  username: string;


  @ApiProperty({example: 'Andrii', description: 'First name'})
  @Column({type: DataType.STRING, allowNull: true})
  firstname: string;


  @ApiProperty({example: 'Plyskach', description: 'Last name'})
  @Column({type: DataType.STRING, allowNull: true})
  lastname: string;


  @ApiProperty({example: 'ankach.work@gmail.com', description: 'User email'})
  @Column({type: DataType.STRING, allowNull: true})
  email: string;


  @Column({type: DataType.STRING})
  password: string;

  @ApiProperty({example: [], description: "User roles.", nullable: false})
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}