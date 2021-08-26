import React from "react";

const getAnswer = (ans) =>
  ans.replaceAll('"', "").replace("[", "").replace("]", "");

const LoadMcq = ({ mcq }) => (
  <>
    <p className='text-skyblue m-0'>
      a. <span className='text-light'>{mcq.mcqOptionA}</span>
    </p>
    <p className='text-skyblue m-0'>
      b. <span className='text-light'>{mcq.mcqOptionB}</span>
    </p>
    <p className='text-skyblue m-0'>
      c. <span className='text-light'>{mcq.mcqOptionC}</span>
    </p>
    <p className='text-skyblue m-0'>
      d. <span className='text-light'>{mcq.mcqOptionD}</span>
    </p>
  </>
);

const Question = ({ question }) => (
  <>
    <div className='d-flex align-items-center'>
      <i className='bi bi-person-fill fs-1 text-light' />
      <span className='d-block text-skyblue m-0 ms-1 fs-4'>
        {question.user}
      </span>
    </div>
    <hr className='bg-light mt-0' />
    <div className='container'>
      <p className='text-justify text-light m-0 mb-1'>{question.question}</p>

      {(question.question_type === "MCQ(Single Correct)" ||
        question.question_type === "MCQ(Multi Correct)") && (
        <LoadMcq mcq={question} />
      )}

      <hr className='bg-secondary' />
      <p className='text-skyblue m-0 mb-1'>
        Correct Answer:
        <span className='text-light ms-1'>
          {getAnswer(question.correct_answer)}
        </span>
      </p>
    </div>
  </>
);

export default Question;