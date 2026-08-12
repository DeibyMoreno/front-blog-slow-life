import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, MOTION_STAGGER_S } from "@/components/ui/reveal";

const pillars = [
  {
    title: "Ensayos",
    text: "Ideas para vestir con intención y vivir despacio.",
  },
  {
    title: "Materiales",
    text: "Lino, algodón orgánico, lana: el origen de cada prenda.",
  },
  {
    title: "Oficios",
    text: "Las manos que cosen, tiñen y tejen sin prisa.",
  },
];

export function AboutPillars() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
            Qué hacemos
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Un diario, tres oficios.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={MOTION_STAGGER_S * index}>
              <Link
                href="/blog"
                className="group flex h-full flex-col rounded-2xl border border-linen bg-sand p-8 transition-colors hover:border-forest/40 hover:bg-cream"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                  {pillar.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {pillar.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors group-hover:border-forest group-hover:text-forest">
                  Leer el blog
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
