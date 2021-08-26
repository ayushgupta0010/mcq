import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GET_ACTIONS } from "../../redux/action";
import Forbidden from "../UtilityComponents/Forbidden";
import ForceLogout from "../AuthComponents/Force_Logout";
import Home from "../HomeComponents";
import Login from "../AuthComponents/Login";
import Navbar from "../NavbarComponents";
import PageNotFound404 from "../UtilityComponents/PageNotFound404";
import PostQuestion from "../HomeComponents/PostQuestion";
import Signup from "../AuthComponents/Signup";
import Unverified from "../UtilityComponents/Unverified";

const Main = () => {
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && username && dispatch(GET_ACTIONS.USER_DETAIL(username));
  }, [dispatch, isLoggedIn, username]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/forbidden' component={Forbidden} />
        <Route exact path='/force_logout' component={ForceLogout} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/post' component={PostQuestion} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/unverified' component={Unverified} />
        <Route path='*' component={PageNotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
