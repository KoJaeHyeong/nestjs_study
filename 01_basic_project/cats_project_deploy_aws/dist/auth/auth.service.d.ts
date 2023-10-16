import { JwtService } from '@nestjs/jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
export declare class AuthService {
    private readonly catsRepository;
    private readonly jwtService;
    constructor(catsRepository: CatsRepository, jwtService: JwtService);
    jwtLogin(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
