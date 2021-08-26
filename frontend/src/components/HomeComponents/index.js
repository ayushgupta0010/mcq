import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QUESTION } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Answer from "../UtilityComponents/Answer";
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
    if (!isLoggedIn) {
      history.push("/login");
    } else if (isVerified === false) {
      history.push("/account-unverified");
    } else {
      document.title = "Home";
      axiosIntercepted
        .get(QUESTION.LIST_FOR_URL, { urlParams: { username } })
        .then((response) => setQuestionsList(response.data))
        .catch((error) => error);
    }
  }, [history, isLoggedIn, isVerified, username]);

  return (
    <div className='container'>
      {questionsList.map((x, i) => (
        <div className='bg-black my-4 p-3 rounded' key={i}>
          {x.type === "question" ? (
            <>
              <div className='d-flex align-items-center'>
                <i className='bi bi-person-fill fs-1 text-light' />
                <span className='d-block text-skyblue m-0 ms-1 fs-4'>
                  {x.user}
                </span>
              </div>

              <div className='container'>
                <p className='text-justify text-light'>{x.question}</p>

                {x.question_type === "MCQ(Single Correct)" && (
                  <McqSingle data={{ ...x }} />
                )}

                {x.question_type === "MCQ(Multi Correct)" && (
                  <McqMulti data={{ ...x }} />
                )}

                {x.question_type === "One-word" && <OneWord data={{ ...x }} />}

                {x.question_type === "True/False" && (
                  <TrueFalse data={{ ...x }} />
                )}
              </div>
            </>
          ) : (
            <Answer answer={x} />
          )}
        </div>
      ))}
      {questionsList.length === 0 && (
        <div className='text-center mt-5'>
          <p className='text-light'>No questions uploaded</p>
        </div>
      )}
    </div>
  );
};

export default Home;
