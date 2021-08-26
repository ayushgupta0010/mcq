import * as actionTypes from "../action/types";

const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
const is_verified = localStorage.getItem("is_verified") === "true";

const defaultDict = {
  isLoggedIn: false,
  username: "",
  role: "",
  is_verified: null,
};

const initialState = username
  ? { ...defaultDict, isLoggedIn: true, username, role, is_verified }
  : defaultDict;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        role: action.payload.role,
        is_verified: action.payload.is_verified,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...defaultDict,
      };

    case actionTypes.UPDATE_IS_VERIFIED:
      return {
        ...state,
        is_verified: action.payload.is_verified,
      };

    default:
      return state;
  }
};

export default reducer;
