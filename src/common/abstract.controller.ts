import { ConflictException, NotFoundException } from "@nestjs/common";

export class AbstractController {
    sendNotFound(objectName: string, ids: number[])
    {
        throw new NotFoundException(objectName + " with id: " + ids.toString()  + " not found.");
    }

    sendConflict(data: object)
    {
        throw new ConflictException(data);
    }
}