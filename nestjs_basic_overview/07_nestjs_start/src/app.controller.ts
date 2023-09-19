import { Request } from 'express';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all/:id/:name')
  getHello(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string },
  ): string {
    // console.log(req);
    console.log(body);
    console.log(param);
    return this.appService.getHello();
  }
}
