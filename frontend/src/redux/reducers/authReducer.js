import * as actionTypes from "../action/types";

const username = localStorage.getItem("username");
const defaultDict = {
  isLoggedIn: false,
  username: "",
  name: "",
  role: "",
  class: "",
};

const initialState = username
  ? { ...defaultDict, isLoggedIn: true, username }
  : defaultDict;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        name: action.payload.name,
        role: action.payload.role,
        class: action.payload.class,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...defaultDict,
      };

    default:
      return state;
  }
};

export default reducer;
