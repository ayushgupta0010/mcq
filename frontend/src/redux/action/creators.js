import { USER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";
import * as actionStates from "./states";

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
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("class", response.data.class);
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
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("class");
  dispatch(actionStates.logout());
};
