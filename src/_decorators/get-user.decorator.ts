import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data]; // Trả về 1 trường cụ thể (ví dụ: userId)
    }
    return request.user; // Trả về cả đối tượng user
  },
);