import { Request } from 'express';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  //* 소비자의 입장
  constructor(private readonly appService: AppService) {} //* 제품

  @Get('all/:id/:name')
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
