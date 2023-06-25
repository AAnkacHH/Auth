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

    getRoleById(id: number): Promise<Role> {
        return this.roleRepository.findByPk(id);
    }

    getRoleByName(name: string): Promise<Role> {
        return this.roleRepository.findOne({where: {name: name}});
    }

    async remove(id: number): Promise<void> {
        // todo check if used
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

        console.log(role);
        return this.roleRepository.update({
            name: role.name,
            description: role.description,
        }, {
            where: {
                'roleId': role.roleId
            },
        }).then((res) => {
            console.log(res);
            return true;
        }, () => false);
    }
}
