import { Reveal } from "@/components/ui/reveal";
import { siteSocial } from "@/config/site";

export function ContactDirect() {
  return (
    <section className="border-t border-linen bg-cream">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-20 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
          Otra vía
        </p>
        <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
          ¿Prefieres un correo?
        </h2>
        <a
          href={`mailto:${siteSocial.email}`}
          className="mt-2 font-display text-xl text-forest underline decoration-sage/60 underline-offset-8 transition-colors hover:text-ink sm:text-2xl"
        >
          {siteSocial.email}
        </a>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
          Para asuntos de prensa, colaboraciones o simplemente una nota larga.
          Respondemos en un par de días, sin prisa.
        </p>
      </Reveal>
    </section>
  );
}