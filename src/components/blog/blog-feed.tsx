"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/lib/blog/types";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}

function FilterChip({ active, onClick, label, count }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ",
        active
          ? "border-forest bg-forest text-cream"
          : "border-linen bg-sand text-stone hover:border-forest hover:text-forest"
      )}
    >
      {label}
      {count != null ? (
        <span
          className={cn("ml-1.5", active ? "text-cream/60" : "text-stone/50")}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

interface BlogFeedProps {
  articles: Article[];
}

export function BlogFeed({ articles }: BlogFeedProps) {
  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const article of articles) {
      const current = map.get(article.category.slug) ?? {
        slug: article.category.slug,
        name: article.category.name,
        count: 0,
      };
      map.set(article.category.slug, {
        slug: current.slug,
        name: current.name,
        count: current.count + 1,
      });
    }
    return [...map.values()];
  }, [articles]);

  const [active, setActive] = useState<string | null>(null);
  const filtered =
    active === null
      ? articles
      : articles.filter((article) => article.category.slug === active);

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 flex items-center gap-5">
          <h2 className="shrink-0 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Todas las historias
          </h2>
          <span aria-hidden className="h-px flex-1 bg-linen" />
        </div>

        <div
          role="group"
          aria-label="Filtrar historias por categoría"
          className="mb-12 flex flex-wrap items-center gap-2"
        >
          <FilterChip active={active === null} onClick={() => setActive(null)} label="Todo" />
          {categories.map((category) => (
            <FilterChip
              key={category.name}
              active={active === category.slug}
              onClick={() =>
                setActive(active === category.slug ? null : category.slug)
              }
              label={category.name}
              count={category.count}
            />
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone">
            Todavía no hay historias en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
}
