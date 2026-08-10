export function BlogHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/login.jpg)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-ink/5 via-ink/20 to-ink/90"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-20 pt-40 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream">
          Slow Life · Blog
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.98] tracking-tight text-cream sm:text-7xl">
          Vivir lento es un acto de <span className="italic">rebeldía</span>.
        </h1>

        <svg
          aria-hidden
          className="mt-10 h-5 w-48 text-cream/50"
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
          «El Slow Life es como sentarse a la orilla de un río: observar cómo
          pasa el agua, respirar el presente y recordar que la prisa es solo
          una ilusión.»
        </p>

        <p className="mt-6 text-sm text-cream/50">
          Historias de estilo de vida y de la ropa que los acompaña.
        </p>
      </div>
    </section>
  );
}
