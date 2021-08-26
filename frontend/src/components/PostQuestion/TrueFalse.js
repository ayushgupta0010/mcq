import React from "react";

const TrueFalse = ({ data }) => (
  <div className='container mb-2'>
    <span className='styledFont text-skyblue me-2'>Correct Answer: </span>
    <div className='form-check form-check-inline'>
      <input
        type='radio'
        id='inlineRadio1'
        className='form-check-input uncheck'
        name='trueFalse'
        value='true'
        onChange={data.handleCorrectAnswerChange}
      />
      <label className='form-check-label text-light' htmlFor='inlineRadio1'>
        True
      </label>
    </div>
    <div className='form-check form-check-inline'>
      <input
        type='radio'
        className='form-check-input uncheck'
        id='inlineRadio2'
        name='trueFalse'
        value='false'
        onChange={data.handleCorrectAnswerChange}
      />
      <label className='form-check-label text-light' htmlFor='inlineRadio2'>
        False
      </label>
    </div>
  </div>
);

export default TrueFalse;
