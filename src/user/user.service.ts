import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserRequest } from "./requests/create-user.request";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(createUserRequest: CreateUserRequest) {
        return await this.userRepository.create(createUserRequest);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(userId: number): Promise<User>
    {
        return await this.userRepository.findByPk(userId);
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
