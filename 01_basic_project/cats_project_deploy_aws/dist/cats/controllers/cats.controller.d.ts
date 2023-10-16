/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AwsService } from 'src/aws.service';
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsService } from '../services/cats.service';
export declare class CatsController {
    private readonly catsService;
    private readonly authService;
    private readonly awsService;
    constructor(catsService: CatsService, authService: AuthService, awsService: AwsService);
    getCurrentCat(cat: any): any;
    signUp(body: CatRequestDto): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }>;
    logIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    uploadCatImg(files: Express.Multer.File, cat: Cat): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }>;
    deleteCatImg(body: object, cat: Cat): Promise<{
        success: boolean;
        result: import("@aws-sdk/client-s3").DeleteObjectCommandOutput;
    }>;
    getAllCat(): Promise<{
        id: string;
        email: string;
        name: string;
        imgUrl: string;
        comments_list: import("../../comments/comments.schema").Comments[];
    }[]>;
}
