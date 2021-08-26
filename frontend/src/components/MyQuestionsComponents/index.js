import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QUESTION } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import Question from "../UtilityComponents/Question";

const MyQuestions = () => {
  const { username } = useSelector((state) => state.auth);

  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    document.title = "My Questions";
    axiosIntercepted
      .get(QUESTION.LIST_BY_URL, { urlParams: { username } })
      .then((response) => setQuestionsList(response.data))
      .catch((error) => error);
  }, [username]);

  return (
    <div className='container'>
      {questionsList.map((x, i) => (
        <div className='bg-black my-4 p-3 rounded' key={i}>
          <Question question={x} />
        </div>
      ))}
    </div>
  );
};

export default MyQuestions;
