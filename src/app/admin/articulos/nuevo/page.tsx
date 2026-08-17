import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostForm } from "@/components/admin/articulos/post-form";
import { listCategories, listTags } from "@/lib/admin/api";

export const metadata: Metadata = {
  title: "Nuevo artículo",
  robots: { index: false, follow: false },
};

export default async function NewArticlePage() {
  const [categories, tags] = await Promise.all([listCategories(), listTags()]);

  return (
    <section className="space-y-8">
      <header className="space-y-1.5">
        <Link
          href="/admin/articulos"
          className="inline-flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> Artículos
        </Link>
        <h1 className="font-display text-3xl tracking-tight text-ink text-balance">
          Nuevo artículo
        </h1>
        <p className="max-w-prose text-sm text-stone">
          Escribe una nueva historia para el blog.
        </p>
      </header>

      <PostForm categories={categories} tags={tags} />
    </section>
  );
}