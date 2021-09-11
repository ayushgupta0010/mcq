import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CREATE_QUESTION } from "../../utils/mutation";
import client from "../../utils/apollo";
import Mcq from "./Mcq";
import OneWord from "./OneWord";
import TrueFalse from "./TrueFalse";

const PostQuestion = () => {
  const {
    username: user,
    isLoggedIn,
    role,
  } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("MCQ(Single Correct)");
  const [mcqOption, setMcqOption] = useState({
    mcqOptionA: "",
    mcqOptionB: "",
    mcqOptionC: "",
    mcqOptionD: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState({
    mcqSingle: "",
    mcqMulti: new Set(),
    oneWord: "",
    trueFalse: "",
  });
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleMcqOptionChange = (e) =>
    setMcqOption({ ...mcqOption, [e.target.name]: e.target.value });

  const handleCorrectAnswerChange = (e) => {
    if (e.target.name !== "mcqMulti") {
      setCorrectAnswer({ ...correctAnswer, [e.target.name]: e.target.value });
    } else {
      if (e.target.checked) {
        setCorrectAnswer({
          ...correctAnswer,
          mcqMulti: new Set(correctAnswer.mcqMulti).add(e.target.value),
        });
      } else {
        correctAnswer.mcqMulti.delete(e.target.value);
        setCorrectAnswer({
          ...correctAnswer,
          mcqMulti: new Set(correctAnswer.mcqMulti),
        });
      }
    }
  };

  const uncheck = () => {
    const elem = document.getElementsByClassName("uncheck");
    for (var i = 0; i < elem.length; i++) elem[i].checked = false;
  };

  const clearForm = () => {
    setQuestion("");
    setMcqOption({
      mcqOptionA: "",
      mcqOptionB: "",
      mcqOptionC: "",
      mcqOptionD: "",
    });
    setCorrectAnswer({
      mcqSingle: "",
      mcqMulti: new Set(),
      oneWord: "",
      trueFalse: "",
    });
    uncheck();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
      user,
      question_type: questionType,
      question,
    };
    if (
      questionType === "MCQ(Single Correct)" ||
      questionType === "MCQ(Multi Correct)"
    ) {
      postData = { ...postData, ...mcqOption };
      if (questionType === "MCQ(Single Correct)") {
        postData.correct_answer = correctAnswer.mcqSingle;
      } else {
        if (correctAnswer.mcqMulti.size !== 0) {
          postData.correct_answer = JSON.stringify(
            Array.from(correctAnswer.mcqMulti).sort()
          );
        } else {
          setMessage("Choose atleast one correct answer");
          return;
        }
      }
    } else if (questionType === "One-word") {
      postData.correct_answer = correctAnswer.oneWord;
    } else {
      postData.correct_answer = correctAnswer.trueFalse;
    }

    client
      .mutate({ mutation: CREATE_QUESTION, variables: { ...postData } })
      .then((response) => {
        setMessage("Question uploaded");
        clearForm();
      });
  };

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (role && role !== "TEACHER") history.push("/forbidden");
    else document.title = "Post Question";
  }, [history, isLoggedIn, role]);

  return (
    <div className='container my-3'>
      <div className='d-flex justify-content-center mt-2'>
        {message && (
          <div className='alert alert-success m-0 styledFont' role='alert'>
            {message}
          </div>
        )}
      </div>
      <div className='rounded bg-black mt-3 p-4'>
        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-3'>
            <textarea
              className='form-control bg-transparent text-light border-secondary'
              style={{ height: "200px" }}
              id='floatingTextarea'
              placeholder='Question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <label
              htmlFor='floatingTextarea'
              className='text-skyblue fw-bolder'>
              Question
            </label>
          </div>

          <div className='form-floating mb-3'>
            <select
              className='form-select bg-transparent text-light border-secondary'
              id='floatingSelectGrid'
              value={questionType}
              onChange={(e) => {
                setQuestionType(e.target.value);
                uncheck();
              }}
              required>
              <option className='bg-black' value='MCQ(Single Correct)'>
                MCQ(Single Correct)
              </option>
              <option className='bg-black' value='MCQ(Multi Correct)'>
                MCQ(Multi Correct)
              </option>
              <option className='bg-black' value='One-word'>
                One-word
              </option>
              <option className='bg-black' value='True/False'>
                True/False
              </option>
            </select>
            <label htmlFor='floatingSelect' className='text-skyblue fw-bolder'>
              Question Type
            </label>
          </div>

          {(questionType === "MCQ(Single Correct)" ||
            questionType === "MCQ(Multi Correct)") && (
            <Mcq
              data={{
                questionType,
                mcqOption,
                handleCorrectAnswerChange,
                handleMcqOptionChange,
              }}
            />
          )}

          {questionType === "One-word" && (
            <OneWord data={{ correctAnswer, handleCorrectAnswerChange }} />
          )}

          {questionType === "True/False" && (
            <TrueFalse data={{ handleCorrectAnswerChange }} />
          )}

          <button className='btn btn-dark'>Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostQuestion;
