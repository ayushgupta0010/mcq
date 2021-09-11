import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    user: login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $username: String!
    $password1: String!
    $password2: String!
    $role: String!
  ) {
    signup(
      username: $username
      password1: $password1
      password2: $password2
      role: $role
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = `
  mutation RefreshToken($refreshToken: String!) {
    getToken: refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($username: String!) {
    verifyUser(username: $username) {
      user {
        id
      }
    }
  }
`;

export const UNVERIFY_USER = gql`
  mutation UnverifyUser($username: String!) {
    deleteUser(username: $username) {
      user {
        id
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $user: String!
    $question: String!
    $question_type: String!
    $mcqOptionA: String
    $mcqOptionB: String
    $mcqOptionC: String
    $mcqOptionD: String
    $correct_answer: String!
  ) {
    createQue(
      questionData: {
        user: $user
        question: $question
        questionType: $question_type
        mcqOptionA: $mcqOptionA
        mcqOptionB: $mcqOptionB
        mcqOptionC: $mcqOptionC
        mcqOptionD: $mcqOptionD
        correctAnswer: $correct_answer
      }
    ) {
      question {
        id
      }
    }
  }
`;
