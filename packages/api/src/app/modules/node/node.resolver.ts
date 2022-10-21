
import { GQLResolvers } from '@app/graphql/generated/schema';
import { nodeField } from '@app/graphql/schema/node';

const resolvers: GQLResolvers = {
  Query: {
    node: nodeField.resolve,
    nodes: nodeField.resolve,
  },
  Node: {
    __resolveType: ({ __typename }) => __typename,
  },
};

export default resolvers;
