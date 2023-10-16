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
exports.CatsRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_schema_1 = require("../comments/comments.schema");
const cats_schema_1 = require("./cats.schema");
let CatsRepository = class CatsRepository {
    constructor(catModel, commentsModel) {
        this.catModel = catModel;
        this.commentsModel = commentsModel;
    }
    async existsByEmail(email) {
        const result = await this.catModel.exists({ email });
        return result;
    }
    async create(cat) {
        return await this.catModel.create(cat);
    }
    async findCatByEmail(email) {
        const cat = await this.catModel.findOne({ email });
        return cat;
    }
    async findCatByIdwithoutPassword(catId) {
        const cat = await this.catModel.findById(catId).select('-password');
        return cat;
    }
    async findByIdAndUpdateImg(id, fileName) {
        console.log('@@@@@@@@@#@#@#');
        const cat = await this.catModel.findById(id);
        cat.imgUrl = fileName;
        const newCat = await cat.save();
        return newCat.cats_info;
    }
    async findAll() {
        const result = await this.catModel
            .find()
            .populate({ path: 'comments', model: this.commentsModel });
        console.log('result', result);
        return result;
    }
};
exports.CatsRepository = CatsRepository;
exports.CatsRepository = CatsRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(cats_schema_1.Cat.name)),
    __param(1, (0, mongoose_1.InjectModel)(comments_schema_1.Comments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CatsRepository);
//# sourceMappingURL=cats.repository.js.map