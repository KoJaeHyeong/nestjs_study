import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SucessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatsService } from './cats.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
@UseFilters(HttpExceptionFilter) //* 전역 필터 적용
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '고양이 정보 불러오기' }) // swagger 문서 설명을 위한 데코레이션
  @Get()
  getCurrentCat() {
    return 'current Cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: 'Success!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 불러오기' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload img';
  }
}
