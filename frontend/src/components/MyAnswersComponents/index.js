import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ANSWER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Answer from "../UtilityComponents/Answer";

const MyAnswers = () => {
  const { isLoggedIn, username, isVerified } = useSelector(
    (state) => state.auth
  );

  const [answersList, setAnswersList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else if (isVerified === false) {
      history.push("/account-unverified");
    } else {
      document.title = "My Answers";
      axiosIntercepted
        .get(ANSWER.LIST_URL, { urlParams: { username } })
        .then((response) => setAnswersList(response.data))
        .catch((error) => error);
    }
  }, [history, isLoggedIn, isVerified, username]);

  return (
    <div className='container'>
      {answersList.map((x, i) => (
        <div className='bg-black my-4 p-3 rounded' key={i}>
          <Answer answer={x} />
        </div>
      ))}
      {answersList.length === 0 && (
        <div className='text-center mt-5'>
          <p className='text-light'>You haven't answered any question</p>
        </div>
      )}
    </div>
  );
};

export default MyAnswers;
