import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ANSWER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Answer from "../UtilityComponents/Answer";

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
          <Answer answer={x} />
        </div>
      ))}
    </div>
  );
};

export default MyAnswers;