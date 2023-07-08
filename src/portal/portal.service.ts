import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Portal} from "./portal.model";
import {Role} from "../role/role.model";

@Injectable()
export class PortalService {
    constructor(
        @InjectModel(Portal)
        private portalRepository: typeof Portal,
    ) {}


    findAll(): Promise<Portal[]> {
        return this.portalRepository.findAll();
    }

    async getPortalById(portalId): Promise<Portal>
    {
        return this.portalRepository.findByPk(portalId);
    }
}
