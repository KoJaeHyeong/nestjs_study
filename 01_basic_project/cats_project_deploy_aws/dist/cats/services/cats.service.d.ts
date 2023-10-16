import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
export declare class CatsService {
    private readonly catsRepository;
    constructor(catsRepository: CatsRepository);
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }>;
    uploadImg(cat: Cat, imgUrl: string): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }>;
    getAllCat(): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }[]>;
}
