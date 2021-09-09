import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QUE_LIST_BY_USER } from "../../utils/query";
import client from "../../utils/apollo";
import Question from "../UtilityComponents/Question";

const MyQuestions = () => {
  const { isLoggedIn, username, role, isVerified } = useSelector(
    (state) => state.auth
  );

  const [questionsList, setQuestionsList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (isVerified === false) history.push("/account-unverified");
    else if (role !== "TEACHER") history.push("/forbidden");
    else {
      document.title = "My Questions";
      client
        .query({ query: QUE_LIST_BY_USER })
        .then((response) => setQuestionsList(response.data.queListByUser))
        .catch((error) => error);
    }
  }, [history, isLoggedIn, isVerified, role, username]);

  return (
    <div className='container'>
      {questionsList.length !== 0 ? (
        questionsList.map((x, i) => (
          <div className='bg-black my-4 p-3 rounded' key={i}>
            <Question question={x} />
          </div>
        ))
      ) : (
        <div className='text-center mt-5'>
          <p className='text-light'>No questions uploaded</p>
        </div>
      )}
    </div>
  );
};

export default MyQuestions;
