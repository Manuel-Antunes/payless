import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { GraphQLContext } from './context';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId);
    const node = await context.dataloaders[type].load(id);
    const response = {
      ...node,
      id,
      __typename: type,
    };
    return response;
  },
);

export { nodeInterface, nodeField, nodesField };
