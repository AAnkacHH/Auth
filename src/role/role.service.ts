import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./role.model";
import { UpdateRoleRequest } from "./requests/update-role.request";
import { CreateRoleRequest } from "./requests/create-role.request";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role)
        private roleRepository: typeof Role,
    ) {}

    findAll(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }

    findOne(id: number): Promise<Role> {
        return this.roleRepository.findByPk(id);
    }

    async remove(id: number): Promise<void> {
        await this.roleRepository.destroy({
            where: {
                'roleId': id
            }
        });
    }

    async create(roleRequest: CreateRoleRequest): Promise<Role>
    {
        return this.roleRepository.create(roleRequest);
    }

    async update(role: Role, updateRoleRequest: UpdateRoleRequest): Promise<boolean>
    {
        role.name = updateRoleRequest.name || role.name;
        role.description = updateRoleRequest.description || role.description;
        return this.roleRepository.update(role, {
            where: {
                'roleId': role.roleId
            },
        }).then(() => true, () => false);
    }
}
