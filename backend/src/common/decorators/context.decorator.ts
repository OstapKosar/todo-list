import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/types/request.types';

export const Context = createParamDecorator(
  (field: keyof AuthenticatedRequest['ctx'], ctx: ExecutionContext) => {
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();

    return request.ctx?.[field];
  },
);
