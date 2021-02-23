import { ApolloClient, ApolloProvider, gql, NormalizedCacheObject } from "@apollo/client";
import React from 'react'
import ReactDOM from "react-dom";
import Pages from "./pages"
import InjectStyles from "./styles"

import { cache } from './cache'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages/>
  </ApolloProvider>,
  document.getElementById('root')
)