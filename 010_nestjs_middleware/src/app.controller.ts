import { CatsService } from './cats/cats.service';
import { Request } from 'express';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catService: CatsService,
  ) {}

  @Get()
  getHello(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string },
  ): string {
    // console.log(req);
    console.log(body);
    console.log(param);
    // return this.appService.getHello();
    return this.catService.hiCatServiceHello();
  }
}
