import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 글로벌 하게 사용하기 위한 미들웨어 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Cats_API')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // 허용 도메인 설정
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);

  logger.log(`http://localhost:${PORT}`, 'ServerPort');
}
bootstrap();
