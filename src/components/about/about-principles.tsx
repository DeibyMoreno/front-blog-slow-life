const principles = [
  {
    title: "Sin prisa",
    text: "Cada elección con calma; cada prenda con tiempo de ser.",
  },
  {
    title: "Vive el presente",
    text: "Lo que llevas puesto es hoy, no una promesa de mañana.",
  },
  {
    title: "Vístete lento",
    text: "Menos prendas, mejores materiales, más intención.",
  },
  {
    title: "Reconecta",
    text: "Con la naturaleza, los amigos, la familia: lo que de verdad importa.",
  },
  {
    title: "Respira",
    text: "El punto final de todo: parar, mirar y agradecer.",
  },
];

export function AboutPrinciples() {
  return (
    <section className="border-y border-linen bg-sand">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
            La carta del Slow Life
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Cinco principios, en ese orden.
          </h2>
        </div>

        <ol className="divide-y divide-linen">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8"
            >
              <span
                aria-hidden
                className="font-display text-4xl italic tracking-tight text-terra/80 sm:text-5xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone sm:text-base">
                  {principle.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
