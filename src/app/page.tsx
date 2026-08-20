import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ArticleGrid, SectionHeading } from "@/components/blog/article-grid";
import { getArticles } from "@/lib/blog/api";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedStory } from "@/components/blog/featured-story";
import { BlogMarquee } from "@/components/blog/blog-marquee";
import { WaveDivider } from "@/components/site/wave-divider";
import { Reveal, MOTION_STAGGER_S } from "@/components/ui/reveal";

export const revalidate = 3600;

export default async function HomePage() {
  const articles = await getArticles(10);
  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <>
      <SiteHeader overlay tone="dark" />

      <main className="flex-1">
        <section
          className="relative border-b border-linen/60 bg-cover bg-center bg-fixed max-md:bg-scroll"
          style={{ backgroundImage: "url(/banner/banner2.webp)" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/35 to-ink/65"
          />
          <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8 animate-[fade-up_0.7s_ease-out_both] motion-reduce:animate-none">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cream/85">
              Slow Life Blog
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.04] tracking-tight text-cream sm:text-7xl">
              Hacemos las cosas a la <span className="italic text-sage">velocidad</span> adecuada.
            </h1>
            <WaveDivider className="mt-10 text-cream!" />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
              ...
            </p>
          </div>
        </section>

        <BlogMarquee />

        {featured ? <FeaturedStory article={featured} /> : null}

        {remaining.length > 0 ? (
          <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <SectionHeading eyebrow="Lo último" title="Artículos recientes" />
            <ArticleGrid>
              {remaining.map((article, index) => (
                <Reveal key={article.id} delay={MOTION_STAGGER_S * index}>
                  <BlogCard article={article} />
                </Reveal>
              ))}
            </ArticleGrid>
          </section>
        ) : null}

        {/*<section className="border-t border-linen bg-sand">
          <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-20 text-center sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terra">
              La carta lenta
            </p>
            <h2 className="max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Un correo lento, {`¿`}cada dos semanas{`?`}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-stone">
              Sin spam. Solo lecturas pausadas sobre materiales, oficios y
              guardarropas que respiran.
            </p>
            <Button
              variant="outline"
              className="border-terra/40 text-terra hover:bg-terra hover:text-cream"
              render={<Link href="/suscripcion" />}
            >
              Unirme a la carta
            </Button>
          </Reveal>
        </section>*/}
      </main>

      <SiteFooter />
    </>
  );
}