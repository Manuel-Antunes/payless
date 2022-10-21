import { toGlobalId } from 'graphql-relay';

import { GQLResolvers, GQLUserConnection } from '@app/graphql/generated/schema';

import {
  clearCache as clearUserCache, load as loadUser,
  loadAll as loadAllUsers
} from './user.loader';

import { UserModel } from './user.model';

const resolvers: GQLResolvers = {
  User: {
    id({ id }) {
      return toGlobalId('User', id);
    },
    _id({ id }) {
      return id;
    },
  },
  Query: {
    me: (_parent, _args, ctx) => ctx.user!,
    users: async (_parent, args, ctx) => {
      const conn = await loadAllUsers(ctx, args);
      return conn as GQLUserConnection;
    },
  },
  Mutation: {
    createUser: async (_parent, args, ctx) => {
      const { input } = args;
      const user = new UserModel({
        email: input.email,
        password: input.password,
        name: input.name,
      });
      await user.save();
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
    updateUser: async (_parent, args, ctx) => {
      const { input, id } = args;
      const user = await loadUser(ctx, id);
      if (!user) {
        throw new Error('User not found');
      }
      await UserModel.findByIdAndUpdate(user._id, input);
      clearUserCache(ctx, id);
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
    deleteUser: async (_parent, args, ctx) => {
      const { id } = args;
      const user = await loadUser(ctx, id);
      if (!user) {
        throw new Error('User not found');
      }
      await user?.remove();
      clearUserCache(ctx, id);
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
  },
};

export default resolvers;
