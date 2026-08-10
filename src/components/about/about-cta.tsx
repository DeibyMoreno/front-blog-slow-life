import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <section className="border-t border-linen bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-20 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terra">
          La carta lenta
        </p>
        <h2 className="max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
          Sé parte de esta conversación pausada.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-stone">
          Sin spam. Solo lecturas pausadas sobre materiales, oficios y
          guardarropas que respiran.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="border-terra/40 text-terra hover:bg-terra hover:text-cream"
            render={<Link href="/suscripcion" />}
          >
            Unirme a la carta
          </Button>
          <Button render={<Link href="/blog" />}>Leer el blog</Button>
        </div>
      </div>
    </section>
  );
}
