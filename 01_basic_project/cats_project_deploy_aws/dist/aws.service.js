"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const common_1 = require("@nestjs/common");
const path = require("path");
class AwsService {
    constructor(catsRepository) {
        this.catsRepository = catsRepository;
        this.S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
        this.awsS3 = new client_s3_1.S3Client({ region: process.env.AWS_S3_REGION });
    }
    async uploadFileToS3(folder, file, cat) {
        try {
            const key = `${folder}/${Date.now()}_${path.basename(file[0].originalname)}`.replace(/ /g, '');
            const multipartUpload = new lib_storage_1.Upload({
                client: this.awsS3,
                params: { Bucket: this.S3_BUCKET_NAME, Key: key, Body: file[0].buffer },
            });
            const result = await multipartUpload.done();
            const imgUrl = result['Location'];
            return imgUrl;
        }
        catch (error) {
            throw new common_1.BadRequestException(`File Upload failed : ${error.message}`);
        }
    }
    async deleteS3Object(folder, key, callback) {
        try {
            const imgKey = `${folder}/${key['key']}`;
            const deleObject = new client_s3_1.DeleteObjectCommand({
                Bucket: this.S3_BUCKET_NAME,
                Key: imgKey,
            });
            const result = await this.awsS3.send(deleObject);
            return { success: true, result: result };
        }
        catch (error) {
            throw new common_1.BadRequestException(`File delete failed ${error.message}`);
        }
    }
}
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map