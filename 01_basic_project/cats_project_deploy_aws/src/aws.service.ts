import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';

export class AwsService {
  private readonly awsS3: S3Client;
  public readonly S3_BUCKET_NAME: string;
  constructor() {
    this.S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    this.awsS3 = new S3Client({ region: process.env.AWS_S3_REGION });
  }

  async uploadFileToS3(
    folder: string,
    file: Express.Multer.File,
  ): Promise<{
    key: string;
    s3Object: object;
    contentType: string;
  }> {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file[0].originalname,
      )}`.replace(/ /g, '');

      const multipartUpload = new Upload({
        client: this.awsS3,
        params: { Bucket: this.S3_BUCKET_NAME, Key: key, Body: file[0].buffer },
      });

      const result = await multipartUpload.done();

      console.log('result', result);

      return { key, s3Object: result, contentType: file[0].mimetype };
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
      const imgKey = `crayon/${key['key']}`;
      console.log('imgKey', imgKey);

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
