import { schema } from '@app/graphql/schema';
import { getContext } from '@app/graphql/schema/context';
import { GraphQLError } from 'graphql';
import { Request } from 'koa';

import { environment } from 'env';

export const graphqlConfig = async (request: Request) => {
  return {
    schema,
    context: getContext(request.ctx),
    graphiql: environment.NODE_ENV !== 'production',
    customFormatErrorFn: (error: GraphQLError) => {
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};
