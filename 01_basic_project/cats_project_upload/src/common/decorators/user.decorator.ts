import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// customDecorators
export const CurrnetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);

    return request.user;
  },
);
