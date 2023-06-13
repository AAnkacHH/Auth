import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserRequest } from "./requests/create-user.request";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

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
