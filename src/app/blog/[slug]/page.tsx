import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ArticleBody } from "@/components/blog/article-body";
import { SectionHeading } from "@/components/blog/article-grid";
import { BlogCard } from "@/components/blog/blog-card";
import { HeroSlideshow } from "@/components/blog/hero-slideshow";
import { PhotoStrip } from "@/components/blog/photo-strip";
import { Reveal, MOTION_STAGGER_S } from "@/components/ui/reveal";
import { getArticleBySlug, getArticles } from "@/lib/blog/api";
// import { getDummyArticleBySlug } from "@/lib/blog/dummy-data";
import { formatDate } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const revalidate = 3600;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article =
    (await getArticleBySlug(slug)) ?? undefined;

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article =
    (await getArticleBySlug(slug)) ?? undefined;

  if (!article) notFound();

  const initials = article.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const others = (await getArticles(6)).filter(
    (a) => a.slug !== article.slug
  );
  const nextStories = others.slice(0, 2);

  const heroImages = [
    ...(article.coverImage ? [article.coverImage] : []),
    ...(article.gallery ?? []),
  ].filter((image, i, all) => all.findIndex((o) => o.url === image.url) === i);


  return (
    <>
      <SiteHeader tone="dark" overlay />

      <article className="flex-1 bg-cream">
        {article.coverImage?.url ? (
          <header className="relative flex min-h-svh items-end overflow-hidden">
            <HeroSlideshow
              images={heroImages}
              altFallback={article.title}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/30 to-ink/25"
            />

            <div className="relative z-10 mx-auto w-full max-w-4xl animate-[fade-up_0.7s_ease-out_both] motion-reduce:animate-none px-5 pb-16 pt-40 sm:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
              >
                <ArrowLeft className="size-4" /> El blog
              </Link>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-cream">
                {article.category.name}
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.06] tracking-tight text-cream sm:text-6xl">
                {article.title}
              </h1>
              {article.excerpt ? (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
                  {article.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cream/60">
                <span className="font-medium text-cream/80">
                  {article.author.name}
                </span>
                <span aria-hidden className="text-cream/30">
                  ·
                </span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span aria-hidden className="text-cream/30">
                  ·
                </span>
                <span>{article.readingTime} min de lectura</span>
              </div>
            </div>
          </header>
        ) : (
          <header className="bg-sand">
            <div className="mx-auto w-full max-w-4xl px-5 pt-16 sm:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-ink"
              >
                <ArrowLeft className="size-4" /> El blog
              </Link>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-terra">
                {article.category.name}
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.06] tracking-tight text-ink sm:text-6xl">
                {article.title}
              </h1>
              {article.excerpt ? (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
                  {article.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 pb-16 text-sm text-stone">
                <span className="font-medium text-ink/80">
                  {article.author.name}
                </span>
                <span aria-hidden className="text-stone/30">
                  ·
                </span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span aria-hidden className="text-stone/30">
                  ·
                </span>
                <span>{article.readingTime} min de lectura</span>
              </div>
            </div>
          </header>
        )}

        {heroImages && heroImages.length > 0 ? (
          <PhotoStrip
            images={[{
              url: "/images/p-1-1.webp"
            },
            {
              url: "/images/p-1-2.webp"
            }, {
              url: "/images/p-1-1.webp"
            },
            {
              url: "/images/p-1-2.webp"
            }, {
              url: "/images/p-1-1.webp"
            },
            {
              url: "/images/p-1-2.webp"
            }]}
            altFallback={article.title}
          />
        ) : null}

        <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-20">

          <div>
            {article.body ? (
              <ArticleBody content={article.body} />
            ) : (
              <p className="text-stone">
                Esta historia aún no tiene contenido.
              </p>
            )}
          </div>

          {article.tags && article.tags.length > 0 ? (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full border border-linen bg-sand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-terra"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : null}

          <Separator className="my-14 bg-linen" />

          <div className="flex items-start gap-4 rounded-2xl border border-linen bg-sand p-6 sm:p-8">
            <Avatar className="size-12">
              {article.author.avatar?.url ? (
                <AvatarImage
                  src={article.author.avatar.url}
                  alt={article.author.name}
                />
              ) : null}
              <AvatarFallback className="bg-linen text-terra">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                Escrito por
              </p>
              <p className="mt-1 font-display text-xl text-ink">
                {article.author.name}
              </p>
              {article.author.bio ? (
                <p className="mt-1 text-sm leading-relaxed text-stone">
                  {article.author.bio}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {nextStories.length > 0 ? (
          <section className="border-t border-linen bg-sand">
            <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
              <SectionHeading
                eyebrow="Seguir leyendo"
                title="Otra historia, sin prisa"
              />
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
                {nextStories.map((item, index) => (
                  <Reveal key={item.id} delay={MOTION_STAGGER_S * index}>
                    <BlogCard article={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <SiteFooter />
    </>
  );
}
