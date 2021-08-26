import { getUserDetail, tryLogin, tryLogout } from "./creators";

export const GET_ACTIONS = {
  USER_DETAIL: getUserDetail,
};

export const TRY_ACTIONS = {
  LOGIN: tryLogin,
  LOGOUT: tryLogout,
};
