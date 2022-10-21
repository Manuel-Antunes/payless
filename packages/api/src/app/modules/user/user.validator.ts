import {
  GQLCreateUserInputSchema, GQLUpdateUserInputSchema
} from '@app/graphql/generated/schema';

const validators = {
  Mutation: {
    updateUser: GQLUpdateUserInputSchema,
    createUser: GQLCreateUserInputSchema,
  },
};

export default validators;
