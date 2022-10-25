import { toGlobalId } from 'graphql-relay';

import { GQLResolvers, GQLUserConnection } from '@app/graphql/generated/schema';

import { Types } from 'mongoose';

import {
  clearCache as clearUserCache,
  load as loadUser,
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
    async contacts({ contacts = [] }, _, ctx) {
      const ctts = await loadAllUsers(ctx, {
        filters: {
          _id_in: contacts.map((c: Types.ObjectId) => c.toString()),
        },
      });
      return ctts!;
    },
  },
  Query: {
    me: (_parent, _args, ctx) => loadUser(ctx, ctx.user._id),
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
      clearUserCache(ctx, user._id);
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
      clearUserCache(ctx, user._id);
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
    addContact: async (_parent, args, ctx) => {
      const { id } = args;
      const user = await UserModel.findById(ctx.user._id);
      if (!user) {
        throw new Error('User not found');
      }
      const contact = await loadUser(ctx, id);
      if (!contact) {
        throw new Error('Contact not found');
      }
      if (!user.contacts) {
        user.contacts = [];
      }
      const exists = (user.contacts as Types.ObjectId[]).find(
        (contactId) => contactId.toString() === id,
      );
      if (exists) {
        throw new Error('Contact already exists');
      }
      user.contacts.push(contact._id);
      await user.save();
      clearUserCache(ctx, ctx.user._id);
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
    removeContact: async (_parent, args, ctx) => {
      const { id } = args;
      const user = await UserModel.findById(ctx.user._id);
      if (!user) {
        throw new Error('User not found');
      }
      const contact = await loadUser(ctx, id);
      if (!contact) {
        throw new Error('Contact not found');
      }
      if (!user.contacts) {
        user.contacts = [];
      }
      const exists = (user.contacts as Types.ObjectId[]).find(
        (contactId) => contactId.toString() === id,
      );
      if (!exists) {
        throw new Error("Contact doesn't exists in user contacts");
      }
      user.contacts = (user.contacts as Types.ObjectId[]).filter(
        (c) => c.toString() !== contact._id.toString(),
      );
      await user.save();
      clearUserCache(ctx, ctx.user._id);
      return {
        cursor: toGlobalId('User', user._id),
        node: loadUser(ctx, user._id),
      };
    },
  },
};

export default resolvers;
