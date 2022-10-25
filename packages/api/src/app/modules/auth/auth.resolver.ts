import { promisify } from 'util';

import { GQLResolvers } from '@app/graphql/generated/schema';
import createError from 'http-errors';

import { compare } from 'bcrypt';
import { Secret, sign, SignOptions } from 'jsonwebtoken';

import authConfig from '@config/auth';

import { load as loadUser } from '../user/user.loader';

import { UserModel } from '../user/user.model';

const signAsync = promisify<
  string | Buffer | object,
  Secret,
  SignOptions,
  string
>(sign);

const resolvers: GQLResolvers = {
  Mutation: {
    login: async (_parent, args, ctx) => {
      try {
        const { input } = args;
        const user = await UserModel.findOne({
          email: input.email,
        });
        if (!user) {
          throw new createError.Unauthorized('Invalid credentials');
        }
        const valid = await compare(input.password, user.password);
        if (!valid) {
          throw new createError.Unauthorized('Invalid credentials');
        }
        const token = await signAsync(
          { userId: user._id + '' },
          authConfig.secret,
          {
            expiresIn: '7d',
          },
        );
        const loadedUser = await loadUser(ctx, user._id)
        return {
          id: loadedUser?.id,
          token,
          user: loadedUser,
        };
      } catch (err) {
        throw createError(401, (err as Error).message);
      }
    },
  },
};

export default resolvers;
