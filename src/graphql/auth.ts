
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserRegistrationInput!) {
    registerUser(input: $input) {
      id
      username
      email
      firstName
      lastName
      isActive
      isEmailVerified
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      tokenType
      expiresIn
      user {
        id
        username
        email
        firstName
        lastName
        isActive
        isEmailVerified
        roles
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      firstName
      lastName
      isActive
      isEmailVerified
      roles
      createdAt
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;
