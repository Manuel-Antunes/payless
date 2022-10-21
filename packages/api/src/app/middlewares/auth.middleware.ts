import { promisify } from 'util';

import { DefaultContext, DefaultState, Middleware } from 'koa';

import { Secret, verify, VerifyOptions } from 'jsonwebtoken';

import { UserModel } from '@app/modules/user/user.model';

import authConfig from '@config/auth';

import { AppMiddleware } from '.';

const verifyAsync = promisify<
  string,
  Secret,
  VerifyOptions | undefined,
  object | string
>(verify);

class AuthMiddleware implements AppMiddleware {
  handle: Middleware<DefaultState, DefaultContext, any> = async (ctx, next) => {
    const auth = ctx.request.headers.authorization;
    if (!auth) {
      return next();
    }
    const [bearer, token] = auth.split(' ');
    if (bearer !== 'Bearer') {
      throw new Error('invalid token');
    }
    const tokenData = (await verifyAsync(
      token,
      authConfig.secret,
      undefined,
    )) as { userId?: string };
    const { userId } = tokenData;
    if (!userId) {
      throw new Error('invalid token');
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('invalid token');
    }
    ctx.state.user = user;
    return next();
  };
}

export default new AuthMiddleware();
