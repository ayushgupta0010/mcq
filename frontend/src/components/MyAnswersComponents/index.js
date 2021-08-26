import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ANSWER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Question from "../UtilityComponents/Question";

const MyAnswers = () => {
  const { username } = useSelector((state) => state.auth);

  const [answersList, setAnswersList] = useState([]);

  useEffect(() => {
    axiosIntercepted
      .get(ANSWER.LIST_URL, { urlParams: { username } })
      .then((response) => setAnswersList(response.data))
      .catch((error) => error);
  }, [username]);

  return (
    <div className='container'>
      {answersList.map((x, i) => (
        <div className='bg-black my-4 p-3 rounded' key={i}>
          <Question question={x.question} />
          <div className='container'>
            <p className='text-skyblue m-0 mb-1'>
              My answer: <span className='text-light'>{x.answer}</span>
            </p>
            <p className='text-skyblue'>
              Marks: <span className='text-light'>{x.marks}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAnswers;
