import { tryLogin, tryLogout } from "./creators";

export const TRY_ACTIONS = {
  LOGIN: tryLogin,
  LOGOUT: tryLogout,
};
