export const WEBSITE = {
  FRONTEND_URL: "http://localhost:3000/",
  BACKEND_URL: "http://127.0.0.1:8000/",
};

export const USER = {
  LOGIN_URL: WEBSITE.BACKEND_URL + "user/login",
  SIGNUP_URL: WEBSITE.BACKEND_URL + "user/signup",
  REFRESH_TOKEN_URL: WEBSITE.BACKEND_URL + "auth/refresh_token",
};

export const QUESTION = {
  CREATE_URL: WEBSITE.BACKEND_URL + "question/create",
  LIST_BY_URL: WEBSITE.BACKEND_URL + "question/list/by/:username",
  LIST_FOR_URL: WEBSITE.BACKEND_URL + "question/list/for/:username",
};

export const ANSWER = {
  CREATE_URL: WEBSITE.BACKEND_URL + "answer/create",
  LIST_URL: WEBSITE.BACKEND_URL + "answer/list/:username",
};