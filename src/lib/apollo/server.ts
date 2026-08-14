import "server-only";

import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

const uri = process.env.GRAPHQL_API_URL;

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
      fetchOptions: {
        cache: "no-store",
      },
    }),
  });
});