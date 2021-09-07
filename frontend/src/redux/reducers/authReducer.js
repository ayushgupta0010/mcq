import * as actionTypes from "../action/types";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const defaultState = {
  isLoggedIn: false,
  username: "",
  role: "",
  token: "",
  refreshToken: "",
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
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
