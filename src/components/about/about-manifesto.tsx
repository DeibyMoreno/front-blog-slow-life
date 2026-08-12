import { Reveal } from "@/components/ui/reveal";

export function AboutManifesto() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <Reveal
          as="div"
          className="about-manifesto mx-auto max-w-3xl font-display text-xl leading-[1.7] tracking-tight text-ink sm:text-2xl"
        >
          <p>
            Slow Life es un estilo de vida que celebra la belleza de lo simple.
          </p>
          <p className="mt-8">
            Se trata de desconectar el ritmo acelerado de la ciudad y
            reconectar con lo que realmente importa: la naturaleza, los amigos
            y la familia.
          </p>
          <p className="mt-8">
            Nuestra ropa refleja este espíritu, diseñada para que te sientas
            cómodo y relajado mientras disfrutas de los momentos que valen la
            pena. Desde un paseo por el bosque hasta una tarde con amigos en el
            parque.
          </p>
          <p className="mt-8">
            Slow Life es la elección perfecta para quienes buscan vivir la vida
            a su propio ritmo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
