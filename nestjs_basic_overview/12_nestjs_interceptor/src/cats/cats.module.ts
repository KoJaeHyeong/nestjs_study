import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //* module에서 exports를 해야 다른 controller에서 injection이 가능.
})
export class CatsModule {}
