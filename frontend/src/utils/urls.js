export const WEBSITE = {
  FRONTEND_URL: "http://localhost:3000/",
  BACKEND_URL: "http://127.0.0.1:8000/",
};

export const USER = {
  DETAIL_URL: WEBSITE.BACKEND_URL + "user/detail/:username",
  LOGIN_URL: WEBSITE.BACKEND_URL + "user/login",
  SIGNUP_URL: WEBSITE.BACKEND_URL + "user/signup",
  REFRESH_TOKEN_URL: WEBSITE.BACKEND_URL + "user/refresh_token",
};

export const QUESTION = {
  CREATE_URL: WEBSITE.BACKEND_URL + "mcq/question/create",
  LIST_BY_URL: WEBSITE.BACKEND_URL + "mcq/question/list/by/:username",
  LIST_FOR_URL: WEBSITE.BACKEND_URL + "mcq/question/list/for/:username",
  ANSWERED_BY_URL: WEBSITE.BACKEND_URL + "mcq/list/question/answered/:pk",
};

export const ANSWER = {
  CREATE_URL: WEBSITE.BACKEND_URL + "mcq/answer/create",
  LIST_URL: WEBSITE.BACKEND_URL + "mcq/answer/list/:username",
};
