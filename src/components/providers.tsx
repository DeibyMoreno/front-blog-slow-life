"use client";

import { MotionConfig } from "motion/react";

import { ApolloWrapper } from "@/lib/apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ApolloWrapper>{children}</ApolloWrapper>
    </MotionConfig>
  );
}