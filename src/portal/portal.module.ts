import { Module } from '@nestjs/common';
import { PortalService } from './portal.service';
import {PortalController} from "./portal.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Portal} from "./portal.model";

@Module({
  controllers: [PortalController],
  providers: [PortalService],
  exports: [PortalService],
  imports: [
    SequelizeModule.forFeature([Portal])
  ],
})
export class PortalModule {}
