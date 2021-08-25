import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ForceLogout from "../AuthComponents/Force_Logout";
import Login from "../AuthComponents/Login";
import Signup from "../AuthComponents/Signup";
import Home from "../HomeComponents";
import Navbar from "../NavbarComponents";
import PageNotFound404 from "../UtilityComponents/PageNotFound404";

const Main = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/force_logout' component={ForceLogout} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route path='*' component={PageNotFound404} />
    </Switch>
  </BrowserRouter>
);

export default Main;
