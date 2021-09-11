import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QUE_LIST_FOR_USER } from "../../utils/query";
import client from "../../utils/apollo";
import McqSingle from "./McqSingle";
import McqMulti from "./McqMulti";
import OneWord from "./OneWord";
import TrueFalse from "./TrueFalse";

const Home = () => {
  const { isLoggedIn, username, isVerified } = useSelector(
    (state) => state.auth
  );

  const [questionsList, setQuestionsList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (isVerified === false) history.push("/account-unverified");
    else {
      document.title = "Home";
      client
        .query({ query: QUE_LIST_FOR_USER })
        .then((response) => setQuestionsList(response.data.queListForUser));
    }
  }, [history, isLoggedIn, isVerified, username]);

  return (
    <div className='container'>
      {questionsList.length !== 0 ? (
        questionsList.map((x, i) => (
          <div className='bg-black my-4 p-3 rounded' key={i}>
            <div className='d-flex align-items-center'>
              <i className='bi bi-person-fill fs-1 text-light' />
              <span className='d-block text-skyblue m-0 ms-1 fs-4'>
                {x.user.username}
              </span>
            </div>

            <div className='container'>
              <p className='text-justify text-light'>{x.question}</p>

              {x.questionType === "MCQ_SINGLE_CORRECT_" && (
                <McqSingle data={{ ...x }} />
              )}

              {x.questionType === "MCQ_MULTI_CORRECT_" && (
                <McqMulti data={{ ...x }} />
              )}

              {x.questionType === "ONE_WORD" && <OneWord data={{ ...x }} />}

              {x.questionType === "TRUE_FALSE" && <TrueFalse data={{ ...x }} />}
            </div>
          </div>
        ))
      ) : (
        <div className='text-center mt-5'>
          <p className='text-light'>No questions for you</p>
        </div>
      )}
    </div>
  );
};

export default Home;
