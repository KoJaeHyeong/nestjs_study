import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    //* 내가 보낸 error 메세지 response를 담는다.
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error == 'string') {
      response.status(status).json({
        statusCode: status,
        sucess: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        //* error_message가 string이 아닌 nest에서 제공하는 에러
        //   statusCode: status,
        sucess: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...error,
      });
    }
  }
}
