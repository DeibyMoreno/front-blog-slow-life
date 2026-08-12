"use client";

import { useRef } from "react";

import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react";

import { WaveDivider } from "@/components/site/wave-divider";

interface Maxim {
  segments: { text: string; accent?: boolean }[];
}

const maxims: Maxim[] = [
  {
    segments: [
      { text: "La naturaleza no tiene prisa, todo crece. Ser paciente para " },
      { text: "florecer", accent: true },
      { text: ", ser Slow Life." },
    ],
  },
  {
    segments: [
      { text: "Slow Life es como " },
      { text: "sentarse a la orilla de un río", accent: true },
      {
        text: " : observar cómo pasa el agua, respirar el presente y recordar que la prisa es solo una ilusión.",
      },
    ],
  },
  {
    segments: [
      { text: "Una vida con prisas es una vida " },
      { text: "sin vivir", accent: true },
      { text: "." },
    ],
  },
  {
    segments: [
      { text: "Vida Lenta", accent: true },
      {
        text: " : una vida conectando con la naturaleza y la belleza de lo simple.",
      },
    ],
  },
  {
    segments: [
      { text: "Hacemos las cosas a la " },
      { text: "velocidad adecuada", accent: true },
      { text: "." },
    ],
  },
];

function Clover({ inView }: { inView: boolean }) {
  const reduce = useReducedMotion();
  const drawn = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: inView || reduce ? 1 : 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.7, ease: "easeOut" as const, delay },
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-9 text-sage"
    >
      <motion.path d="M12 25V20.3" {...drawn(0)} />
      <motion.path
        d="M12 10L8.603 6.56a2.104 2.104 0 0 1 0-2.95a2.04 2.04 0 0 1 2.912 0L12 4l.485-.39a2.04 2.04 0 0 1 2.912 0a2.104 2.104 0 0 1 0 2.95z"
        {...drawn(0.3)}
      />
      <motion.path
        d="M14 12l3.44-3.397a2.104 2.104 0 0 1 2.95 0a2.04 2.04 0 0 1 0 2.912L20 12l.39.485a2.04 2.04 0 0 1 0 2.912a2.104 2.104 0 0 1-2.95 0z"
        {...drawn(0.5)}
      />
      <motion.path
        d="M12 14l-3.397 3.44a2.104 2.104 0 0 0 0 2.95a2.04 2.04 0 0 0 2.912 0L12 20l.485.39a2.04 2.04 0 0 0 2.912 0a2.104 2.104 0 0 0 0-2.95z"
        {...drawn(0.7)}
      />
      <motion.path
        d="M10 12L6.56 8.603a2.104 2.104 0 0 0-2.95 0a2.04 2.04 0 0 0 0 2.912L4 12l-.39.485a2.04 2.04 0 0 0 0 2.912a2.104 2.104 0 0 0 2.95 0z"
        {...drawn(0.9)}
      />
    </svg>
  );
}

function MaximRow({ maxim }: { maxim: Maxim }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="grid gap-6 py-14 sm:py-16 lg:grid-cols-[3rem_1fr] lg:gap-12"
    >
      <div className="flex justify-start">
        <Clover inView={inView} />
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <p className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-2xl lg:text-3xl">
          {maxim.segments.map((segment) =>
            segment.accent ? (
              <span key={segment.text} className="italic text-sage">
                {segment.text}
              </span>
            ) : (
              segment.text
            )
          )}
        </p>
      </motion.blockquote>
    </div>
  );
}

export function AboutMaxims() {
  return (
    <section className="border-t border-linen bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-4">
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Para leer despacio
          </h2>
        </div>

        <WaveDivider />

        <MotionConfig reducedMotion="user">
          <div className="mt-6 divide-y divide-linen">
            {maxims.map((maxim, index) => (
              <MaximRow key={index} maxim={maxim} />
            ))}
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
