import { ANSWER } from "./urls";
import axiosIntercepted from "./axiosIntercepted";

export const getAnswer = (ans) =>
  ans.replaceAll('"', "").replace("[", "").replace("]", "");

export const postAnswer = async (user, question, answer, marks) =>
  await axiosIntercepted
    .post(ANSWER.CREATE_URL, { user, question, answer, marks })
    .then((response) => response.data);
