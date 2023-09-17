import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService], //* service를 계속 더해 나가는건 좋은 패턴이 아니다. 그래서 module을 exports 후 모듈에서 imports하는게 좋은 패턴
})
export class AppModule {}
