import { Controller, Get } from '@nestjs/common';
import { AppService } from "./app.service";

@Controller('/app')
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private appService:AppService) {}

  @Get()
  getHello(): [{ name: string; id: number }] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.appService.getUsers1();
  }
}
