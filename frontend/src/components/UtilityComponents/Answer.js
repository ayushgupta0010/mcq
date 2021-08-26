import React from "react";
import Question from "./Question";

const getAnswer = (ans) =>
  ans.replaceAll('"', "").replace("[", "").replace("]", "");

const Answer = ({ answer }) => (
  <>
    <Question question={answer.question} />
    <div className='container'>
      <p className='text-skyblue m-0 mb-1'>
        My answer:
        <span className='text-light ms-1'>{getAnswer(answer.answer)}</span>
      </p>
      <p className='text-skyblue'>
        Marks: <span className='text-light'>{answer.marks}</span>
      </p>
    </div>
  </>
);

export default Answer;
