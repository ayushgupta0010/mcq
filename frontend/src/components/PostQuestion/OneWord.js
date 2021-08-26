import React from "react";

const OneWord = ({ data }) => (
  <div className='container'>
    <div className='form-floating mb-3'>
      <input
        type='text'
        className='form-control bg-transparent text-light border-secondary'
        id='floatingInput'
        name='oneWord'
        placeholder='Correct Answer'
        value={data.correctAnswer.oneWord}
        onChange={data.handleCorrectAnswerChange}
        required
      />
      <label
        htmlFor='floatingInput'
        className='styledFont text-skyblue fw-bolder'>
        Correct Answer
      </label>
    </div>
  </div>
);

export default OneWord;
