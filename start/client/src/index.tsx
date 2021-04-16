import {
  ApolloClient,
  ApolloProvider,
  gql,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
  concat
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import 'semantic-ui-css/semantic.min.css'

import { cache } from "./cache";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cardItems: [ID!]
  }
`;

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('x-token') || null,
    }
  });

  return forward(operation);
})


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  typeDefs,
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages/>
  </ApolloProvider>,
  document.getElementById("root")
);
