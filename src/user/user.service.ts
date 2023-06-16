import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { CreateUserRequest } from "./requests/create-user.request";
import { UpdateUserRequest } from "./requests/update-user.request";
import { Role } from "../role/role.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(createUserRequest: CreateUserRequest): Promise<User> {
        return this.getUserByUsername(createUserRequest.username)
            .then((user) => {
                if (user !== null) {
                    return Promise.reject(user)
                }
                return this.userRepository.create(createUserRequest);
            });
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(userId: number): Promise<User>
    {
        return await this.userRepository.findByPk(userId);
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



    assignRoleToUser(user: User, role: Role): void
    {

    }
}
