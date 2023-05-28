import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProduces, ApiProperty } from "@nestjs/swagger";

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
  @Column({type: DataType.STRING, unique: true})

  @ApiProperty({example: 'ankach', description: 'Unique username'})
  username: string;
  @Column({type: DataType.STRING, allowNull: true})

  @ApiProperty({example: 'Andrii', description: 'First name'})
  firstname: string;
  @Column({type: DataType.STRING, allowNull: true})

  @ApiProperty({example: 'Plyskach', description: 'Last name'})
  lastname: string;
  @Column({type: DataType.STRING, allowNull: true})

  @ApiProperty({example: 'ankach.work@gmail.com', description: 'User email'})
  email: string;
  @Column({type: DataType.STRING})
  password: string;
}