import * as actionTypes from "./types";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      username: user.username,
      name: user.name,
      role: user.role,
      class: user.class,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
