import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { CatsRepository } from './cats/cats.repository';
import { Cat } from './cats/cats.schema';

export class AwsService {
  private readonly awsS3: S3Client;
  public readonly S3_BUCKET_NAME: string;
  constructor(private readonly catsRepository: CatsRepository) {
    this.S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    this.awsS3 = new S3Client({ region: process.env.AWS_S3_REGION });
  }

  async uploadFileToS3(folder: string, file: Express.Multer.File, cat: Cat) {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file[0].originalname,
      )}`.replace(/ /g, '');

      const multipartUpload = new Upload({
        client: this.awsS3,
        params: { Bucket: this.S3_BUCKET_NAME, Key: key, Body: file[0].buffer },
      });

      const result = await multipartUpload.done();
      const imgUrl = result['Location'];

      return imgUrl;
    } catch (error) {
      throw new BadRequestException(`File Upload failed : ${error.message}`);
    }
  }

  async deleteS3Object(
    folder: string,
    key: object,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectsOutput) => void,
  ) {
    try {
      const imgKey = `${folder}/${key['key']}`;

      const deleObject = new DeleteObjectCommand({
        Bucket: this.S3_BUCKET_NAME,
        Key: imgKey,
      });

      const result = await this.awsS3.send(deleObject);

      return { success: true, result: result };
    } catch (error) {
      throw new BadRequestException(`File delete failed ${error.message}`);
    }
  }
}
