import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const GetUser = createParamDecorator(
  (data: never, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    // session 사용시
    // console.log(req.session.userId);
    return req.user;
  },
);
