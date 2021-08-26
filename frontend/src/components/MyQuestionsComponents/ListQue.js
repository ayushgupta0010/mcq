import React from "react";

const getAnswer = (ans) =>
  ans.replaceAll('"', "").replace("[", "").replace("]", "");

const LoadMcq = ({ mcq }) => (
  <div className='container p-1'>
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
  </div>
);

const ListQue = ({ questionsList }) =>
  questionsList.map((x, i) => (
    <div className='bg-black my-4 p-3 rounded' key={i}>
      <div className='d-flex align-items-center'>
        <i className='bi bi-person-fill fs-1 text-light' />
        <span className='d-block text-skyblue m-0 ms-1 fs-4'>{x.user}</span>
      </div>
      <hr className='bg-light mt-0' />
      <div className='container'>
        <p className='text-justify text-light m-0'>{x.question}</p>

        {(x.question_type === "MCQ(Single Correct)" ||
          x.question_type === "MCQ(Multi Correct)") && <LoadMcq mcq={x} />}

        <hr className='bg-secondary' />
        <p className='text-skyblue'>
          Correct Answer:
          <span className='text-light ms-1'>{getAnswer(x.correct_answer)}</span>
        </p>
      </div>
    </div>
  ));

export default ListQue;
