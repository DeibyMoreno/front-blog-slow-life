import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Article } from "@/lib/blog/types";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/reveal";

interface FeaturedStoryProps {
  article: Article;
}

export function FeaturedStory({ article }: FeaturedStoryProps) {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
        <Reveal className="group grid overflow-hidden rounded-2xl border border-linen bg-sand lg:grid-cols-2">
          <Link
            href={`/blog/${article.slug}`}
            className="relative aspect-4/3 overflow-hidden bg-sand lg:aspect-auto"
          >
            {article.coverImage ? (
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt ?? article.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-800 ease-out group-hover:scale-[1.03]"
              />
            ) : null}
          </Link>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terra">
              Última historia · {article.category.name}
            </p>
            <h2 className="mt-5 font-display text-3xl leading-[1.08] tracking-tight text-ink transition-colors group-hover:text-forest sm:text-4xl">
              <Link
                href={`/blog/${article.slug}`}
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
              <span className="font-medium text-stone/80">
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

            <Link
              href={`/blog/${article.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-ink/40 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors group-hover:border-forest group-hover:text-forest"
            >
              Leer la historia
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
