"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const app_module_1 = require("../app.module");
const auth_module_1 = require("../auth/auth.module");
const comments_schema_1 = require("../comments/comments.schema");
const cats_repository_1 = require("./cats.repository");
const cats_schema_1 = require("./cats.schema");
const cats_controller_1 = require("./controllers/cats.controller");
const cats_service_1 = require("./services/cats.service");
let CatsModule = class CatsModule {
};
exports.CatsModule = CatsModule;
exports.CatsModule = CatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: cats_schema_1.Cat.name, schema: cats_schema_1.CatSchema },
                { name: comments_schema_1.Comments.name, schema: comments_schema_1.CommentsSchema },
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            platform_express_1.MulterModule.register({
                dest: './upload',
                storage: (0, multer_1.memoryStorage)(),
            }),
            (0, common_1.forwardRef)(() => app_module_1.AppModule),
        ],
        controllers: [cats_controller_1.CatsController],
        providers: [cats_service_1.CatsService, cats_repository_1.CatsRepository],
        exports: [cats_service_1.CatsService, cats_repository_1.CatsRepository],
    })
], CatsModule);
//# sourceMappingURL=cats.module.js.map