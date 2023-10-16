"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrnetUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrnetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map