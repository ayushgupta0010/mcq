import { USER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import * as actionStates from "./states";

export const getUserDetail = (username) => (dispatch) => {
  const isVerified = localStorage.getItem("isVerified") === "true";
  if (!isVerified) {
    axiosIntercepted
      .get(USER.DETAIL_URL, { urlParams: { username } })
      .then((response) => {
        localStorage.setItem("isVerified", response.data.is_verified);
        dispatch(actionStates.updateIsVerified(response.data.is_verified));
      })
      .catch((error) => error);
  }
};

export const tryLogin = (username, password) => async (dispatch) => {
  return await axiosIntercepted
    .post(USER.LOGIN_URL, { username, password })
    .then((response) => {
      if (response.data.access && response.data.refresh) {
        axiosIntercepted.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("isVerified", response.data.is_verified);
      }
      dispatch(actionStates.login(response.data));
      return response;
    })
    .catch((error) => error.response);
};

export const tryLogout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("isVerified");
  dispatch(actionStates.logout());
};
