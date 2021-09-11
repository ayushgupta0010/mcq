import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAnswer } from "../../utils/helperFunc";
import { QUE_ANS_BY_LIST } from "../../utils/query";
import client from "../../utils/apollo";

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

const Question = ({ question }) => {
  const { role } = useSelector((state) => state.auth);

  const [answeredByList, setAnsweredByList] = useState([]);

  const handleClick = (id) =>
    client
      .query({ query: QUE_ANS_BY_LIST, variables: { id } })
      .then((response) => setAnsweredByList(response.data.list));

  const UsersList = () =>
    answeredByList.map((x, i) => (
      <li key={i} className='list-group-item bg-dark border-0'>
        <div className='d-flex justify-content-between'>
          <p
            className={
              x.marks === "1"
                ? "m-0 styledFont text-success"
                : "m-0 styledFont text-danger"
            }>
            {x.user.username}
          </p>
          {x.marks === "1" ? (
            <i className='bi bi-check-lg text-success' />
          ) : (
            <i className='bi bi-x-lg text-danger' />
          )}
        </div>
      </li>
    ));

  return (
    <>
      <div className='d-flex align-items-center'>
        <i className='bi bi-person-fill fs-1 text-light' />
        <span className='d-block text-skyblue m-0 ms-1 fs-4'>
          {question.user.username}
        </span>
      </div>
      <hr className='bg-light mt-0' />
      <div className='container'>
        <p className='text-justify text-light m-0 mb-1'>{question.question}</p>

        {(question.questionType === "MCQ_SINGLE_CORRECT_" ||
          question.questionType === "MCQ_MULTI_CORRECT_") && (
          <LoadMcq mcq={question} />
        )}

        <hr className='bg-secondary' />
        <div className='d-flex justify-content-between'>
          <p className='text-skyblue m-0 mb-1'>
            Correct Answer:
            <span className='text-light ms-1'>
              {getAnswer(question.correctAnswer)}
            </span>
          </p>
          {role === "TEACHER" && (
            <button
              className='btn p-0'
              data-bs-toggle='offcanvas'
              data-bs-target={`#offcanvas${question.id}`}
              aria-controls='offcanvasRight'
              onClick={() => handleClick(question.id)}>
              <i className='bi bi-eye text-skyblue fs-5 p-0' />
            </button>
          )}
        </div>
      </div>
      <div
        className='offcanvas offcanvas-end bg-dark'
        data-bs-scroll='true'
        data-bs-backdrop='true'
        tabIndex='-1'
        id={`offcanvas${question.id}`}
        aria-labelledby='offcanvasRightLabel'>
        <div className='offcanvas-header text-light'>
          <h5 id='offcanvasRightLabel'>Answered By</h5>
          <button
            type='button'
            className='btn-close text-reset bg-light'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          />
        </div>
        <div className='offcanvas-body py-0'>
          <ul className='list-group'>
            {answeredByList.length !== 0 ? (
              <UsersList />
            ) : (
              <p className='text-light'>No user has answered till now</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Question;
