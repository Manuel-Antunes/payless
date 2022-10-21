import { ParameterizedContext } from 'koa';

import { getLoaders } from './dataloaders';

export function getContext(ctx: ParameterizedContext) {
  return {
    req: ctx.request,
    user: ctx.state.user,
    dataloaders: getLoaders(),
  };
}

export type GraphQLContext = ReturnType<typeof getContext>;
