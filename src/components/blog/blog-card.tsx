"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "motion/react";

import type { Article } from "@/lib/blog/types";
import { formatDate } from "@/lib/format";

const CARD_HOVER_SCALE = 1.04;
const CARD_HOVER_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;

interface BlogCardProps {
  article: Article;
}

export function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-sand ring-1 ring-linen">
          {article.coverImage ? (
            <motion.div
              initial={false}
              whileHover={{ scale: CARD_HOVER_SCALE }}
              transition={CARD_HOVER_SPRING}
              className="absolute inset-0"
            >
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt ?? article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-full border border-terra/15 bg-terra/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-terra">
            {article.category.name}
          </span>
          <span className="text-xs text-terra/80">
            {article.readingTime} min
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl leading-snug tracking-tight text-ink transition-colors group-hover:text-forest sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs text-stone/80">
          {article.author.name} · {formatDate(article.publishedAt)}
        </p>
      </Link>
    </article>
  );
}