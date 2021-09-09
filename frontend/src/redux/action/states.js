import * as actionTypes from "./types";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      token: user.token,
      refreshToken: user.refreshToken,
    },
  };
};

export const updateUserDetails = (user) => {
  return {
    type: actionTypes.UPDATE_USER_DETAIL,
    payload: {
      username: user.username,
      role: user.role,
      isVerified: user.isVerified,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
