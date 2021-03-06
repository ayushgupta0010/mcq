import * as actionStates from "./states";
import { GET_USER_DETAIL } from "../../utils/query";
import { LOGIN, REVOKE_TOKEN, SIGNUP } from "../../utils/mutation";
import client from "../../utils/apollo";

export const getUserDetail = () => (dispatch) => {
  client
    .query({ query: GET_USER_DETAIL })
    .then((response) =>
      dispatch(actionStates.updateUserDetails(response.data.user))
    );
};

export const tryLogin = (username, password) => async (dispatch) => {
  return await client
    .mutate({ mutation: LOGIN, variables: { username, password } })
    .then((response) => {
      if (response.data.user.token) {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("refreshToken", response.data.user.refreshToken);
        dispatch(actionStates.login(response.data.user));
      }
      return response;
    });
};

export const trySignup = (username, password, role) => async (dispatch) => {
  return await client
    .mutate({
      mutation: SIGNUP,
      variables: {
        username: username,
        password1: password,
        password2: password,
        role: role,
      },
    })
    .then((response) => {
      if (response.data.signup.success) {
        localStorage.setItem("token", response.data.signup.token);
        localStorage.setItem("refreshToken", response.data.signup.refreshToken);
        dispatch(actionStates.login(response.data.signup));
      }
      return response.data.signup.errors;
    });
};

export const tryLogout = () => (dispatch) => {
  client.mutate({
    mutation: REVOKE_TOKEN,
    variables: { refreshToken: localStorage.getItem("refreshToken") },
  });
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  dispatch(actionStates.logout());
  client.clearStore();
};
