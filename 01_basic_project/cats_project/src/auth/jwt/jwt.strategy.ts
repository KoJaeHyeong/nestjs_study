import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { Strategy } from 'passport-local';
import { CatsRepository } from 'src/cats/cats.repository';
import { PayLoad } from './jwt.payload';

// JwtAuthGuard가 실행 -> JwtStrategy의 PassportStrategy실행 -> validate함수 호출
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // strategy는 인증할때 사용(jwt에 대한 설정)
  constructor(private readonly catsRepositoty: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRETKEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayLoad) {
    const cat = await this.catsRepositoty.findCatByIdwithoutPassword(
      payload.sub, // unique 값
    );

    console.log(cat);
    if (cat) {
      return cat; //request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
