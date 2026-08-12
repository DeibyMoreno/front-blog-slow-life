"use client";

import { useRef } from "react";

import { motion, useInView, useReducedMotion } from "motion/react";

interface WaveDividerProps {
  className?: string;
}

export function WaveDivider({ className }: WaveDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      <svg
        aria-hidden
        className={`h-5 w-50 text-terra/60 ${className}`}
        viewBox="0 0 192 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <motion.path
          d="M2 10c16-8 32-8 48 0s32 8 48 0 32-8 48 0"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView || reduce ? 1 : 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 2, ease: "easeOut" }
          }
        />
      </svg>
    </div>
  );
}