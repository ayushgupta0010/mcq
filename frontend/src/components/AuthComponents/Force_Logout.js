import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { TRY_ACTIONS } from "../../redux/action";

const ForceLogout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(TRY_ACTIONS.LOGOUT());
    window.location.reload();
  };

  return <>{isLoggedIn ? logout() : <Redirect to='/login' />}</>;
};

export default ForceLogout;
