import {
  ApolloClient,
  ApolloProvider,
  gql,
  NormalizedCacheObject,
  useQuery,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import InjectStyles from "./styles";
import { Router } from "@reach/router";

import { cache } from "./cache";
import Login from "./pages/login";
import Registration from "./pages/registation";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cardItems: [ID!]
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log("DATAA", data)
  return data.isLoggedIn ? (
    <Pages />
  ) : (
    <Router primary={false}>
      <Login path="/"/>
      <Registration path="/registration" />
    </Router>
  );
};

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("id") || "",
  },
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
