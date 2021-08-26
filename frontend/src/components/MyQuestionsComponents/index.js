import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { QUESTION } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Question from "../UtilityComponents/Question";

const MyQuestions = () => {
  const { isLoggedIn, username, role, isVerified } = useSelector(
    (state) => state.auth
  );

  const [questionsList, setQuestionsList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else if (isVerified === false) {
      history.push("/unverified");
    } else if (isLoggedIn && role !== "teacher") {
      history.push("/forbidden");
    } else {
      document.title = "My Questions";
      axiosIntercepted
        .get(QUESTION.LIST_BY_URL, { urlParams: { username } })
        .then((response) => setQuestionsList(response.data))
        .catch((error) => error);
    }
  }, [history, isLoggedIn, isVerified, role, username]);

  return (
    <div className='container'>
      {questionsList.map((x, i) => (
        <div className='bg-black my-4 p-3 rounded' key={i}>
          <Question question={x} />
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

export default MyQuestions;
