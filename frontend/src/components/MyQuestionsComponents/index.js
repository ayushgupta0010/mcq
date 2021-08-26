import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QUESTION } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import ListQue from "./ListQue";

const MyQuestions = () => {
  const { username } = useSelector((state) => state.auth);

  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    axiosIntercepted
      .get(QUESTION.LIST_BY_URL, { urlParams: { username } })
      .then((response) => setQuestionsList(response.data))
      .catch((error) => error);
  }, [username]);

  return (
    <div className='container'>
      <ListQue questionsList={questionsList} />
    </div>
  );
};

export default MyQuestions;
