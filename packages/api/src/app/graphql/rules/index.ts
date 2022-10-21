import { rule } from 'graphql-shield';
import createError from 'http-errors';

import { GraphQLContext } from '../schema/context';

export const isAuthenticated = rule({ cache: 'contextual' })(
  (_parent, _arg, ctx: GraphQLContext) => {
    if (!ctx.user) {
      return createError(401, 'Not authorized');
    }
    return true;
  },
);
