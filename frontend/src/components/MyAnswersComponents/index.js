import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ANS_LIST } from "../../utils/query";
import client from "../../utils/apollo";
import Answer from "../UtilityComponents/Answer";

const MyAnswers = () => {
  const { isLoggedIn, username, isVerified } = useSelector(
    (state) => state.auth
  );

  const [answersList, setAnswersList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (isVerified === false) history.push("/account-unverified");
    else {
      document.title = "My Answers";
      client
        .query({ query: ANS_LIST })
        .then((response) => setAnswersList(response.data.ansList));
    }
  }, [history, isLoggedIn, isVerified, username]);

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
          <p className='text-light'>You haven't answered any questions</p>
        </div>
      )}
    </div>
  );
};

export default MyAnswers;
