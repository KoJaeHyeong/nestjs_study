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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cats_repository_1 = require("../../cats/cats.repository");
const comments_schema_1 = require("../comments.schema");
let CommentsService = class CommentsService {
    constructor(commentsModel, catsRepository) {
        this.commentsModel = commentsModel;
        this.catsRepository = catsRepository;
    }
    async getAllComments() {
        try {
            const comments = await this.commentsModel.find();
            return comments;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createComments(id, comments) {
        try {
            const targetCat = await this.catsRepository.findCatByIdwithoutPassword(id);
            const { author, contents } = comments;
            const validatorAuthor = await this.catsRepository.findCatByIdwithoutPassword(author);
            const newComment = new this.commentsModel({
                author: validatorAuthor._id,
                contents,
                info: targetCat._id,
            });
            return await newComment.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async plusLike(id) {
        try {
            const likeCount = await this.commentsModel.findById(id);
            likeCount.likeCount += 1;
            return await likeCount.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cats_repository_1.CatsRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map