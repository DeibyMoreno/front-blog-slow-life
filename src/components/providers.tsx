"use client";

import { ApolloWrapper } from "@/lib/apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}