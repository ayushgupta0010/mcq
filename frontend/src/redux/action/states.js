import * as actionTypes from "./types";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      username: user.username,
      role: user.role,
      is_verified: user.is_verified,
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const updateIsVerified = (is_verified) => {
  return {
    type: actionTypes.UPDATE_IS_VERIFIED,
    payload: { is_verified },
  };
};
