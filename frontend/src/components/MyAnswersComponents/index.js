import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import client from "../../utils/apollo";
import Answer from "../UtilityComponents/Answer";

const MyAnswers = () => {
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  const [answersList, setAnswersList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      document.title = "My Answers";
      client
        .query({
          query: gql`
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
          `,
        })
        .then((response) => setAnswersList(response.data.ansList));
    }
  }, [history, isLoggedIn, username]);

  return (
    <div className='container'>
      {answersList.length !== 0 ? (
        answersList.map((x, i) => (
          <div className='bg-black my-4 p-3 rounded' key={i}>
            <Answer answer={x} />
          </div>
        ))
      ) : (
        <div className='text-center mt-5'>
          <p className='text-light'>You haven't answered any question</p>
        </div>
      )}
    </div>
  );
};

export default MyAnswers;
