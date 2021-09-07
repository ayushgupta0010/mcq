import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postAnswer } from "../../utils/helperFunc";
import InnerAnswer from "./InnerAnswer";

const TrueFalse = ({ data }) => {
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
      <span className='styledFont text-skyblue me-2'>Options: </span>
      <div className='form-check form-check-md-inline'>
        <input
          type='radio'
          id='inlineRadio1'
          className='form-check-input uncheck'
          name='answers'
          value='true'
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio1'>
          True
        </label>
      </div>
      <div className='form-check form-check-md-inline'>
        <input
          type='radio'
          className='form-check-input uncheck'
          id='inlineRadio2'
          name='answers'
          value='false'
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio2'>
          False
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

export default TrueFalse;
