const mantras = [
  "Sin prisa",
  "Vive el presente",
  "La prisa es solo una ilusión",
  "Vístete lento",
  "Observa el agua pasar",
  "Respira",
];

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
    >
      {mantras.map((mantra) => (
        <span key={mantra} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-xs font-semibold uppercase tracking-[0.3em] text-terra/70">
            {mantra}
          </span>
          <span className="size-1 rounded-full bg-terra/30" />
        </span>
      ))}
    </div>
  );
}

export function BlogMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-linen bg-sand py-5">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] motion-reduce:animate-none">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  );
}
