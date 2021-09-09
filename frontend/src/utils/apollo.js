import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "http://127.0.0.1:8000/graphql/" });

const authMiddleware = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `JWT ${localStorage.getItem("token")}` || null,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authMiddleware.concat(httpLink),
});

export default client;
