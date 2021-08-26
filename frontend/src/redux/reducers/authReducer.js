import * as actionTypes from "../action/types";

const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
const isVerified = localStorage.getItem("isVerified") === "true";

const defaultDict = {
  isLoggedIn: false,
  username: "",
  role: "",
  isVerified: null,
};

const initialState = username
  ? { ...defaultDict, isLoggedIn: true, username, role, isVerified }
  : defaultDict;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        role: action.payload.role,
        isVerified: action.payload.isVerified,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...defaultDict,
      };

    case actionTypes.UPDATE_IS_VERIFIED:
      return {
        ...state,
        isVerified: action.payload.isVerified,
      };

    default:
      return state;
  }
};

export default reducer;
