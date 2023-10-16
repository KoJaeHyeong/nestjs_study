"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../auth/auth.service");
const login_request_dto_1 = require("../../auth/dto/login.request.dto");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("../../aws.service");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const http_exception_filter_1 = require("../../common/exceptions/http-exception.filter");
const success_interceptor_1 = require("../../common/interceptor/success.interceptor");
const cats_schema_1 = require("../cats.schema");
const cat_dto_1 = require("../dto/cat.dto");
const cats_request_dto_1 = require("../dto/cats.request.dto");
const cats_service_1 = require("../services/cats.service");
let CatsController = class CatsController {
    constructor(catsService, authService, awsService) {
        this.catsService = catsService;
        this.authService = authService;
        this.awsService = awsService;
    }
    getCurrentCat(cat) {
        return cat.readOnlyData;
    }
    async signUp(body) {
        return await this.catsService.signUp(body);
    }
    logIn(data) {
        return this.authService.jwtLogin(data);
    }
    async uploadCatImg(files, cat) {
        const imgUrl = await this.awsService.uploadFileToS3('crayon', files, cat);
        return this.catsService.uploadImg(cat, imgUrl);
    }
    deleteCatImg(body, cat) {
        console.log(body);
        return this.awsService.deleteS3Object('crayon', body);
    }
    getAllCat() {
        return this.catsService.getAllCat();
    }
};
exports.CatsController = CatsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양이 정보 불러오기' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrnetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getCurrentCat", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Server Error...',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success!',
        type: cat_dto_1.ReadOnlyCatDto,
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cats_request_dto_1.CatRequestDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양이 이미지 등록 하기' }),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image')),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, user_decorator_1.CurrnetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cats_schema_1.Cat]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "uploadCatImg", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양이 이미지 삭제하기' }),
    (0, common_1.Post)('deleteimg'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrnetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cats_schema_1.Cat]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "deleteCatImg", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모든 고양이 가져오기' }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getAllCat", null);
exports.CatsController = CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SucessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [cats_service_1.CatsService,
        auth_service_1.AuthService,
        aws_service_1.AwsService])
], CatsController);
//# sourceMappingURL=cats.controller.js.map