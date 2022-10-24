import { graphql } from 'react-relay';

export default graphql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      id
      token
      user {
        name
        id
        _id
        email
        createdAt
        updatedAt
      }
    }
  }
`;
