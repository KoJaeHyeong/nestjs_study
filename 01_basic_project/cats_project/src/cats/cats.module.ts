import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //* module에서 exports를 해야 다른 controller에서 injection이 가능.
})
export class CatsModule {}
