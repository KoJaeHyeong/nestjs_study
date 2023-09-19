import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hiCatServiceHello() {
    return 'Hello Cats';
  }
}
