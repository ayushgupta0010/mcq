import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postAnswer } from "../../utils/helperFunc";
import InnerAnswer from "./InnerAnswer";

const McqSingle = ({ data }) => {
  const { username: user } = useSelector((state) => state.auth);

  const [answer, setAnswer] = useState("");
  const [answerReceived, setAnswerReceived] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: question, correct_answer } = data;
    const marks = correct_answer === answer ? 1 : 0;
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
          value='a'
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio1'>
          {data.mcqOptionA}
        </label>
      </div>
      <div className='form-check form-check-md-inline'>
        <input
          type='radio'
          className='form-check-input uncheck'
          id='inlineRadio2'
          name='answers'
          value='b'
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio2'>
          {data.mcqOptionB}
        </label>
      </div>
      <div className='form-check form-check-md-inline'>
        <input
          type='radio'
          id='inlineRadio3'
          className='form-check-input uncheck'
          name='answers'
          value='c'
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio3'>
          {data.mcqOptionC}
        </label>
      </div>
      <div className='form-check form-check-md-inline'>
        <input
          type='radio'
          className='form-check-input uncheck'
          id='inlineRadio4'
          name='answers'
          value='d'
          onChange={(e) => setAnswer(e.target.value)}
        />
        <label className='form-check-label text-light' htmlFor='inlineRadio4'>
          {data.mcqOptionD}
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

export default McqSingle;
