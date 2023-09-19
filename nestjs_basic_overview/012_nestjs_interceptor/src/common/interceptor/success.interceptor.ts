import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SucessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(
      map((data) => ({
        succeses: true,
        data,
      })),
    ); //* controller에서의 response를 Data로 받는다. return 폼을 정해줄 수 있겠다?!
  }
}
