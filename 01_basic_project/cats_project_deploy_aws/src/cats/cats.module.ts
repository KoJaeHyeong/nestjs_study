import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema }, // CatModule 안에 CommentsSchema를 사용 할거기 때문
    ]),
    forwardRef(() => AuthModule), // 서로의 모듈을 참조하여 모듈간의 순환 참조성 해결
    MulterModule.register({
      dest: './upload',
      storage: memoryStorage(),
    }),
    // AwsService,
    forwardRef(() => AppModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], //* module에서 exports를 해야 다른 controller에서 injection이 가능.
})
export class CatsModule {}
