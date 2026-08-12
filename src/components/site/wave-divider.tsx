"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
}

function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function WaveDivider({ className }: WaveDividerProps) {
  const { ref: dividerRef, inView: dividerInView } = useInView<HTMLDivElement>();

  return (
    <div ref={dividerRef}>
      <svg
        aria-hidden
        className={`h-5 w-48 text-terra/60 ${className}`}
        viewBox="0 0 192 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          pathLength={1}
          d="M2 10c16-8 32-8 48 0s32 8 48 0 32-8 48 0"
          strokeLinecap="round"
          className={cn(
            "[stroke-dasharray:1] transition-[stroke-dashoffset] duration-2000 ease-out motion-reduce:transition-none",
            dividerInView
              ? "[stroke-dashoffset:0]"
              : "[stroke-dashoffset:1]"
          )}
        />
      </svg>
    </div>
  );
}