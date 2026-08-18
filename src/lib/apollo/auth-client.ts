import "server-only";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function createAuthClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_API_URL,
      fetchOptions: { cache: "no-store" },
    }),
  });
}