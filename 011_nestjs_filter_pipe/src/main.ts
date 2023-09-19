import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); //* 글로벌 필터 적용
  const logger = new Logger();
  await app.listen(8000);
  logger.log('http://localhost:8000', 'ServerPort');
}
bootstrap();
