import { gql } from "apollo-boost";

export const GET_ALL_RECIPE = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      instructions
      createdAt
      likes
      username
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($data: SignupUserInput!) {
    signupUser(data: $data) {
      token
    }
  }
`;

export const SIGNIN = gql`
  mutation($data: SigninInput!) {
    signin(data: $data) {
      token
    }
  }
`;
