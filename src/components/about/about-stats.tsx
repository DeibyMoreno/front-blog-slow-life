const stats = [
  { value: "—", label: "Años de oficio" },
  { value: "—", label: "Prendas lentas" },
  { value: "—", label: "Materiales naturales" },
  { value: "—", label: "Manos amigas" },
];

export function AboutStats() {
  return (
    <section className="border-y border-linen bg-sand">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="rounded-2xl border-2 border-dashed border-linen bg-cream p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
            Cifras · Para completar
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-linen pl-5">
                <dd className="font-display text-5xl tracking-tight text-ink">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-xs italic text-stone">
            Pendiente de completar: reemplaza los guiones por las cifras reales
            de la marca.
          </p>
        </div>
      </div>
    </section>
  );
}
