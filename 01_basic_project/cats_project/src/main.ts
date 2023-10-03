import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 글로벌 하게 사용하기 위한 미들웨어 설정
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  await app.listen(PORT);

  logger.log(`http://localhost:${PORT}`, 'ServerPort');
}
bootstrap();
