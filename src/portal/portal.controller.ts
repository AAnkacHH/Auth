import {Controller, Get, Param} from '@nestjs/common';
import {AbstractController} from "../common/abstract.controller";
import {PortalService} from "./portal.service";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Portal} from "./portal.model";

@ApiTags('Portals')
@Controller('portals')
export class PortalController extends AbstractController {
    constructor(private readonly portalService: PortalService) {
        super();
    }

    @Get()
    @ApiOperation({ summary: 'Get all portals.' })
    @ApiResponse({ status: 200, description: 'The found records.' })
    findAll(): Promise<Portal[]>
    {
        return this.portalService.findAll();
    }

    @Get(':portalId')
    @ApiOperation({ summary: 'Get a portal by id' })
    @ApiResponse({ status: 200, description: 'The found record.' })
    @ApiParam({ name: 'portalId', required: true, description: 'The portal id' })
    async findOne(@Param('portalId') portalId): Promise<Portal>
    {
        const portal = await this.portalService.getPortalById(portalId);
        if (portal === null) {
            this.sendNotFound('Portal', [portalId]);
        }
        return portal;
    }

}
