import * as actionTypes from "../action/types";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const defaultState = {
  isLoggedIn: false,
  username: null,
  role: null,
  token: null,
  refreshToken: null,
  isVerified: null,
};

const initialState =
  token && refreshToken
    ? { ...defaultState, isLoggedIn: true, token, refreshToken }
    : defaultState;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };

    case actionTypes.UPDATE_USER_DETAIL:
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        isVerified: action.payload.isVerified,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...defaultState,
      };

    default:
      return state;
  }
};

export default reducer;
