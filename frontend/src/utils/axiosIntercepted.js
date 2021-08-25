import axios from "axios";
import { USER, WEBSITE } from "./urls";

const baseURL = WEBSITE.BACKEND_URL;

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const axiosIntercepted = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: accessToken ? "JWT " + accessToken : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosIntercepted.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + USER.REFRESH_TOKEN_URL
    ) {
      window.location.href = "/force_logout";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosIntercepted
            .post(USER.REFRESH_TOKEN_URL, { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.access);
              localStorage.setItem("refreshToken", response.data.refresh);

              axiosIntercepted.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosIntercepted(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/force_logout";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/force_logout";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

axiosIntercepted.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }

  const currentUrl = new URL(config.url, config.baseURL);
  // parse pathName to implement variables
  Object.entries(config.urlParams || {}).forEach(([k, v]) => {
    currentUrl.pathname = currentUrl.pathname.replace(
      `:${k}`,
      encodeURIComponent(v)
    );
  });
  return {
    ...config,
    baseURL: `${currentUrl.protocol}//${currentUrl.host}`,
    url: currentUrl.pathname,
  };
});

export default axiosIntercepted;
