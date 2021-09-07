import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postAnswer } from "../../utils/helperFunc";
import InnerAnswer from "./InnerAnswer";

const OneWord = ({ data }) => {
  const { username: user } = useSelector((state) => state.auth);

  const [answer, setAnswer] = useState("");
  const [answerReceived, setAnswerReceived] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: question, correctAnswer } = data;
    const marks = correctAnswer === answer ? 1 : 0;
    const res = await postAnswer(user, question, answer, marks);
    setAnswerReceived(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-transparent text-light border-secondary'
          id='floatingInput'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <label htmlFor='floatingInput' className='text-skyblue fw-bolder'>
          Your answer
        </label>
      </div>
      {answerReceived === "" ? (
        <div className='text-center mt-3'>
          <button className='btn btn-dark'>Submit</button>
        </div>
      ) : (
        <InnerAnswer answer={answerReceived} />
      )}
    </form>
  );
};

export default OneWord;
