/// <reference types="multer" />
import * as AWS from 'aws-sdk';
import { CatsRepository } from './cats/cats.repository';
import { Cat } from './cats/cats.schema';
export declare class AwsService {
    private readonly catsRepository;
    private readonly awsS3;
    readonly S3_BUCKET_NAME: string;
    constructor(catsRepository: CatsRepository);
    uploadFileToS3(folder: string, file: Express.Multer.File, cat: Cat): Promise<any>;
    deleteS3Object(folder: string, key: object, callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectsOutput) => void): Promise<{
        success: boolean;
        result: import("@aws-sdk/client-s3").DeleteObjectCommandOutput;
    }>;
}
