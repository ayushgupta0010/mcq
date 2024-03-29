import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { login } from "../redux/action/states";
import { tryLogout } from "../redux/action/creators";
import { REFRESH_AND_REVOKE_TOKEN } from "./mutation";
import { GRAPHQL_URL } from "./urls";
import store from "../redux/store";
import axios from "axios";
import jwtDecode from "jwt-decode";

const uri = GRAPHQL_URL;

const httpLink = new HttpLink({ uri });

const authMiddleware = setContext(async (_, { headers }) => {
  var token = localStorage.getItem("token") || null;

  if (token) {
    const { exp } = jwtDecode(token);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      await axios
        .post(uri, {
          query: REFRESH_AND_REVOKE_TOKEN,
          variables: { refreshToken: localStorage.getItem("refreshToken") },
        })
        .then((response) => {
          if (response.data.data.getToken === null) store.dispatch(tryLogout());
          else {
            token = response.data.data.getToken.token;
            localStorage.setItem("token", token);
            localStorage.setItem(
              "refreshToken",
              response.data.data.getToken.refreshToken
            );
            store.dispatch(login(response.data.data.getToken));
          }
        });
    }
  }

  return {
    headers: {
      ...headers,
      Authorization: `JWT ${token}` || null,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authMiddleware.concat(httpLink),
});

export default client;
