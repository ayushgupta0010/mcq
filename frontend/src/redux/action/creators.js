import * as actionStates from "./states";
import client from "../../utils/apollo";
import gql from "graphql-tag";

export const getUserDetail = () => (dispatch) => {
  client
    .query({
      query: gql`
        query {
          user: me {
            username
            role
          }
        }
      `,
    })
    .then((response) => {
      if (response.data.user) {
        dispatch(actionStates.updateUserDetails(response.data.user));
      } else {
        client
          .mutate({
            mutation: gql`
              mutation RefreshToken($refreshToken: String!) {
                getToken: refreshToken(refreshToken: $refreshToken) {
                  token
                  refreshToken
                }
              }
            `,
            variables: { refreshToken: localStorage.getItem("refreshToken") },
          })
          .then((response) => {
            if (response.data.getToken) {
              localStorage.setItem("token", response.data.getToken.token);
              localStorage.setItem(
                "refreshToken",
                response.data.getToken.refreshToken
              );
              dispatch(actionStates.login(response.data.getToken));
            } else {
              tryLogout();
            }
          });
      }
    })
    .catch((error) => console.log(error));
};

export const tryLogin = (username, password) => async (dispatch) => {
  return await client
    .mutate({
      mutation: gql`
        mutation Login($username: String!, $password: String!) {
          user: login(username: $username, password: $password) {
            token
            refreshToken
          }
        }
      `,
      variables: { username, password },
    })
    .then((response) => {
      if (response.data.user.token) {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("refreshToken", response.data.user.refreshToken);
        dispatch(actionStates.login(response.data.user));
      }
      return response;
    })
    .catch((error) => console.log(error));
};

export const trySignup = (username, password, role) => async (dispatch) => {
  return await client
    .mutate({
      mutation: gql`
        mutation Signup(
          $username: String!
          $password1: String!
          $password2: String!
          $role: String!
        ) {
          signup(
            username: $username
            password1: $password1
            password2: $password2
            role: $role
          ) {
            success
            errors
            token
            refreshToken
          }
        }
      `,
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
    })
    .catch((error) => console.log(error));
};

export const tryLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  dispatch(actionStates.logout());
};
