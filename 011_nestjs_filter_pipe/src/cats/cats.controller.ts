import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) //* 전역 필터 적용
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) //* 부분 필터 적용
  getAllCat() {
    throw new HttpException('api is broken', 404);
    return 'all cat';
  }

  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    //* ParseIntPipe : TaskA, PositiveIntPipe : TaskB => 하나씩 검사
    //* pipe를 통해 string을 int로 변경
    //* pipe 종류가 많다,,, docs 참고! [https://docs.nestjs.com/pipes]
    //* object 형식이 아닌 value값을 받을 수 있다.
    console.log(param);
    console.log(typeof param); //* 기존은 string

    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete';
  }
}
