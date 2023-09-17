import { Request } from 'express';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all/:id/:name') //* 데코레이터를 활용하여 동적 라우팅에서 @Param을 이용할 수 있음.
  getHello(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string }, //* DTO 개념
  ): string {
    // console.log(req);
    console.log(body);
    console.log(param);
    return this.appService.getHello();
  }
}
