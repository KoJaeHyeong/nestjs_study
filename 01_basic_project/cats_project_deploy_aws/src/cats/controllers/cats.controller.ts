import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

import { FilesInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws.service';
import { CurrnetUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SucessInterceptor } from 'src/common/interceptor/success.interceptor';
import { Cat } from '../cats.schema';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsService } from '../services/cats.service';

@Controller('cats')
@UseInterceptors(SucessInterceptor)
@UseFilters(HttpExceptionFilter) //* 전역 필터 적용
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    private readonly awsService: AwsService,
  ) {}

  @ApiOperation({ summary: '고양이 정보 불러오기' }) // swagger 문서 설명을 위한 데코레이션
  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrnetUser() cat: any) {
    return cat.readOnlyData;
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
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '고양이 이미지 등록 하기' })
  @Post('upload')
  // @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseInterceptors(FilesInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  async uploadCatImg(
    // @UploadedFiles() files: Array<Express.Multer.File>,
    @UploadedFiles() files: Express.Multer.File,
    @CurrnetUser() cat: Cat,
  ) {
    const imgUrl = await this.awsService.uploadFileToS3('crayon', files, cat);
    return this.catsService.uploadImg(cat, imgUrl);
  }

  @ApiOperation({ summary: '고양이 이미지 삭제하기' })
  @Post('deleteimg')
  @UseGuards(JwtAuthGuard)
  deleteCatImg(@Body() body: object, @CurrnetUser() cat: Cat) {
    console.log(body);

    return this.awsService.deleteS3Object('crayon', body);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
