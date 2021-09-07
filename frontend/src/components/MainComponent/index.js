import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GET_ACTIONS } from "../../redux/action";
import Home from "../HomeComponents";
import Login from "../AuthComponents/Login";
import MyAnswers from "../MyAnswersComponents";
import MyQuestions from "../MyQuestionsComponents";
import Navbar from "../NavbarComponents";
import PageNotFound404 from "../UtilityComponents/PageNotFound404";
import PostQuestion from "../PostQuestion";
import Signup from "../AuthComponents/Signup";

const Main = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && dispatch(GET_ACTIONS.USER_DETAIL());
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/my-answers' component={MyAnswers} />
        <Route exact path='/my-questions' component={MyQuestions} />
        <Route exact path='/post' component={PostQuestion} />
        <Route exact path='/signup' component={Signup} />
        <Route path='*' component={PageNotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
