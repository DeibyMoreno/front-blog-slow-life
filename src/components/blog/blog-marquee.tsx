const mantras = [
  "Voy a mi propio ritmo",
  "Lo simple también es suficiente",
  "Ser paciente para florecer",
  "La prisa es solo una ilusión",
  "Observa el agua pasar",
  "Hoy elijo lo simple",
  "La calma no se negocia"
];

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {mantras.map((mantra) => (
        <span key={mantra} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-xs font-semibold uppercase tracking-[0.3em] text-cream">
            {mantra}
          </span>
          <span className="size-1 rounded-full bg-cream" />
        </span>
      ))}
    </div>
  );
}

export function BlogMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-linen bg-ink py-5">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] motion-reduce:animate-none">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
