//* 무조건 양수로 들어오게 하는 pipe

import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    console.log(value);

    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }

    return value; //* taskA, taskB
  }
}
