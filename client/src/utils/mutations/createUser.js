import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      token
      user {
        username
        firstName
      }
    }
  }
`;
