import { isAuthenticated } from '@app/graphql/rules';

export default {
  Mutation: {
    updateUser: isAuthenticated,
    deleteUser: isAuthenticated,
  },
};
