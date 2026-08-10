import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
}

export function WaveDivider({ className }: WaveDividerProps) {
  return (
    <svg
      aria-hidden
      className={cn("h-5 w-48", className)}
      viewBox="0 0 192 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M2 10c16-8 32-8 48 0s32 8 48 0 32-8 48 0"
        strokeLinecap="round"
      />
    </svg>
  );
}
