import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 글로벌 하게 사용하기 위한 미들웨어 설정
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERS]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // http://localhost:8000/media/cats/aaa.png

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media', // prefix를 넣음으로써 url로 불러올시 url주소 커스텀 가능
  });

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
