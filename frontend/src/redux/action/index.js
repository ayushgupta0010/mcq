import { getUserDetail, tryLogin, tryLogout, trySignup } from "./creators";

export const GET_ACTIONS = {
  USER_DETAIL: getUserDetail,
};

export const TRY_ACTIONS = {
  LOGIN: tryLogin,
  LOGOUT: tryLogout,
  SIGNUP: trySignup,
};
