export function AboutHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/login2.jpg)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-ink/10 via-ink/20 to-ink/70"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end items-center px-5 pb-20 pt-40 sm:px-8">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream">
          Slow Life · Nosotros
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-cream sm:text-7xl">
          Quiénes somos, y por qué hacemos las cosas{" "}
          <span className="italic text-sage">despacio</span>.
        </h1>

        <svg
          aria-hidden
          className="mt-10 h-5 w-48 text-terra/60"
          viewBox="0 0 192 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M2 10c16-8 32-8 48 0s32 8 48 0 32-8 48 0"
            strokeLinecap="round"
          />
        </svg>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
          Un diario editorial sobre moda lenta, materiales con criterio y una
          forma de vestir más consciente.
        </p>
      </div>

    </section>
  );
}
