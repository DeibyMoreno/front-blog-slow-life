"use client";

import type { ReactNode } from "react";

import { motion } from "motion/react";

export const MOTION_DURATION_S = 0.7;
export const MOTION_STAGGER_S = 0.09;
export const REVEAL_DISTANCE_PX = 16;

const REVEAL_EASE = "easeOut";

type RevealElement =
  | "div"
  | "section"
  | "article"
  | "figure"
  | "li"
  | "span"
  | "p"
  | "h2"
  | "h3";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: RevealElement;
  delay?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  distance = REVEAL_DISTANCE_PX,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: MOTION_DURATION_S, ease: REVEAL_EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}