import type { ReactNode } from "react";

import { Reveal, MOTION_STAGGER_S } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        {eyebrow ? (
          <Reveal
            as="p"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-terra"
          >
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal
          as="h2"
          delay={MOTION_STAGGER_S}
          className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          {title}
        </Reveal>
      </div>
    </div>
  );
}

export function ArticleGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}