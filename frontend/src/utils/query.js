import gql from "graphql-tag";

export const GET_USER_DETAIL = gql`
  query {
    user: me {
      id
      username
      role
      isVerified
    }
  }
`;

export const UNVERIFIED_USERS_LIST = gql`
  query {
    list: listUnverified {
      id
      username
    }
  }
`;

export const QUE_LIST_FOR_USER = gql`
  query {
    queListForUser {
      id
      user {
        username
      }
      questionType
      question
      mcqOptionA
      mcqOptionB
      mcqOptionC
      mcqOptionD
      correctAnswer
    }
  }
`;

export const QUE_LIST_BY_USER = gql`
  query {
    queListByUser {
      user {
        username
      }
      question
      questionType
      mcqOptionA
      mcqOptionB
      mcqOptionC
      mcqOptionD
      correctAnswer
    }
  }
`;

export const ANS_LIST = gql`
  query {
    ansList {
      question {
        user {
          username
        }
        questionType
        question
        mcqOptionA
        mcqOptionB
        mcqOptionC
        mcqOptionD
        correctAnswer
      }
      answer
      marks
    }
  }
`;
