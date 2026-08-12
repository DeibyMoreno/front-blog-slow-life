import { Reveal } from "@/components/ui/reveal";

export function AboutHistory() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <div className="rounded-2xl border-2 border-dashed border-linen bg-cream p-8 sm:p-12">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
              Nuestra historia · Para completar
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              De dónde venimos
            </h2>
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone sm:text-base">
              <p>
                <span className="font-semibold text-ink">
                  Año y lugar de fundación.
                </span>{" "}
                Por definir: aquí contaremos cuándo y dónde nace Slow Life.
              </p>
              <p>
                <span className="font-semibold text-ink">El origen.</span>{" "}
                Por definir: la historia de por qué empezamos a hacer moda
                lenta.
              </p>
              <p>
                <span className="font-semibold text-ink">
                  Nuestra misión.
                </span>{" "}
                Por definir: qué buscamos cambiar en la forma de vestir y de
                consumir.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
