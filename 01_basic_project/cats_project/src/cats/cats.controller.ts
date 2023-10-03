import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SucessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
@UseFilters(HttpExceptionFilter) //* 전역 필터 적용
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current Cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);

    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload img';
  }
}
