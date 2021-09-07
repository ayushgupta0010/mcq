import gql from "graphql-tag";
import client from "./apollo";

export const getAnswer = (ans) =>
  ans.replaceAll('"', "").replace("[", "").replace("]", "");

export const postAnswer = async (user, question, answer, marks) =>
  await client
    .mutate({
      mutation: gql`
        mutation CreateAns(
          $user: String!
          $question: ID!
          $answer: String!
          $marks: Int!
        ) {
          createAns(
            ansData: {
              user: $user
              question: $question
              answer: $answer
              marks: $marks
            }
          ) {
            answer {
              question {
                correctAnswer
              }
              answer
              marks
            }
          }
        }
      `,
      variables: { user, question, answer, marks },
    })
    .then((response) => response.data.createAns.answer);
