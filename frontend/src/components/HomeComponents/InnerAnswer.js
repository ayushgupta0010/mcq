import React from "react";
import { getAnswer } from "../../utils/helperFunc";

const InnerAnswer = ({ answer }) => (
  <>
    <hr className='bg-secondary' />
    <p className='text-skyblue m-0 mb-1'>
      Correct answer:
      <span className='text-light ms-1'>
        {getAnswer(answer.question.correct_answer)}
      </span>
    </p>
    <p className='text-skyblue m-0 mb-1'>
      My answer:
      <span className='text-light ms-1'>{getAnswer(answer.answer)}</span>
    </p>
    <p className='text-skyblue'>
      Marks: <span className='text-light'>{answer.marks}</span>
    </p>
  </>
);

export default InnerAnswer;
