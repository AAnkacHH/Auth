import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserRequest } from "./requests/create-user.request";
import { UpdateUserRequest } from "./requests/update-user.request";
import { Role } from "../role/role.model";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RoleService
    ) {}

    async createUser(createUserRequest: CreateUserRequest): Promise<User>
    {
        let baseRole = await this.roleService.getRoleByName('USER');
        let newUser = await this.userRepository.create(createUserRequest);
        await newUser.$set("roles", [baseRole.roleId]);
        return newUser;
    }

    async getAllUsers()
    {
        return await this.userRepository.findAll();
    }

    async getUserById(userId: number): Promise<User>
    {
        return await this.userRepository.findByPk(userId, {include: {all: true}});
    }

    async getUserByUsername(username: string): Promise<User>
    {
        return await this.userRepository.findOne({
            where: {
                'username': username
            }
        });
    }

    async updateUser(user: User, updateUserRequest: UpdateUserRequest):Promise<boolean>
    {
        return await this.userRepository.update({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
        }, {
            where: {
                'userId': user.userId
            },
        }).then(() => {return true}, () => {return false});
    }

    async deleteUserById(userId: number): Promise<boolean>
    {
        const res = await this.userRepository.destroy({
            where: {
                'userId': userId
            }
        });

        return res === 1;
    }
}
