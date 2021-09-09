import React from "react";

const Mcq = ({ data }) => {
  const name =
    data.questionType === "MCQ(Single Correct)" ? "mcqSingle" : "mcqMulti";
  const inputType = name === "mcqSingle" ? "radio" : "checkbox";

  return (
    <div className='container'>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-transparent text-light border-secondary'
          id='floatingInput'
          name='mcqOptionA'
          placeholder='Option A'
          value={data.mcqOption.mcqOptionA}
          onChange={data.handleMcqOptionChange}
          required
        />
        <label htmlFor='floatingInput' className='text-skyblue fw-bolder'>
          Option A
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-transparent text-light border-secondary'
          id='floatingInput'
          name='mcqOptionB'
          placeholder='Option B'
          value={data.mcqOption.mcqOptionB}
          onChange={data.handleMcqOptionChange}
          required
        />
        <label htmlFor='floatingInput' className='text-skyblue fw-bolder'>
          Option B
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-transparent text-light border-secondary'
          id='floatingInput'
          name='mcqOptionC'
          placeholder='Option C'
          value={data.mcqOption.mcqOptionC}
          onChange={data.handleMcqOptionChange}
          required
        />
        <label htmlFor='floatingInput' className='text-skyblue fw-bolder'>
          Option C
        </label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control bg-transparent text-light border-secondary'
          id='floatingInput'
          name='mcqOptionD'
          placeholder='Option D'
          value={data.mcqOption.mcqOptionD}
          onChange={data.handleMcqOptionChange}
          required
        />
        <label htmlFor='floatingInput' className='text-skyblue fw-bolder'>
          Option D
        </label>
      </div>
      <div className='mb-2'>
        <span className='styledFont fw-bold text-skyblue me-2'>
          Correct Answer:
        </span>
        <div className='form-check form-check-inline'>
          <input
            type={inputType}
            id='answerA'
            className='form-check-input uncheck'
            name={name}
            value='a'
            onChange={data.handleCorrectAnswerChange}
          />
          <label className='form-check-label text-light' htmlFor='answerA'>
            a
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            type={inputType}
            className='form-check-input uncheck'
            id='answerB'
            name={name}
            value='b'
            onChange={data.handleCorrectAnswerChange}
          />
          <label className='form-check-label text-light' htmlFor='answerB'>
            b
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            type={inputType}
            id='answerC'
            className='form-check-input uncheck'
            name={name}
            value='c'
            onChange={data.handleCorrectAnswerChange}
          />
          <label className='form-check-label text-light' htmlFor='answerC'>
            c
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input
            type={inputType}
            className='form-check-input uncheck'
            id='answerD'
            name={name}
            value='d'
            onChange={data.handleCorrectAnswerChange}
          />
          <label className='form-check-label text-light' htmlFor='answerD'>
            d
          </label>
        </div>
      </div>
    </div>
  );
};

export default Mcq;
