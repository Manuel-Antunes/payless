import { promisify } from 'util';

import { GQLResolvers } from '@app/graphql/generated/schema';
import createError from 'http-errors';

import { compare } from 'bcrypt';
import { Secret, sign, SignOptions } from 'jsonwebtoken';

import authConfig from '@config/auth';

import { UserModel } from '../user/user.model';

const signAsync = promisify<
  string | Buffer | object,
  Secret,
  SignOptions,
  string
>(sign);

const resolvers: GQLResolvers = {
  Mutation: {
    login: async (_parent, args) => {
      try {
        const { input } = args;
        const user = await UserModel.findOne({
          email: input.email,
        });
        if (!user) {
          return {
            clientMutationId: input.clientMutationId,
            error: ['invalid email or password'],
          };
        }
        const valid = await compare(input.password, user.password);
        if (!valid) {
          return {
            clientMutationId: input.clientMutationId,
            error: ['invalid email or password'],
          };
        }
        const token = await signAsync(
          { userId: user._id + '' },
          authConfig.secret,
          {
            expiresIn: '7d',
          },
        );
        return {
          clientMutationId: input.clientMutationId,
          token,
        };
      } catch (err) {
        throw createError(401, (err as Error).message);
      }
    },
  },
};

export default resolvers;
