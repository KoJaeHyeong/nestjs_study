import { Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { PayLoad } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly catsRepositoty;
    constructor(catsRepositoty: CatsRepository);
    validate(payload: PayLoad): Promise<import("../../cats/cats.schema").Cat>;
}
export {};
