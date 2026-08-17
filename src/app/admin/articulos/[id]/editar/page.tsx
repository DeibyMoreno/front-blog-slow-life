import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostForm } from "@/components/admin/articulos/post-form";
import { getPostDetail, listCategories, listTags } from "@/lib/admin/api";

export const metadata: Metadata = {
  title: "Editar artículo",
  robots: { index: false, follow: false },
};

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const [post, categories, tags] = await Promise.all([
    getPostDetail(id),
    listCategories(),
    listTags(),
  ]);

  if (!post) notFound();

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
          Editar artículo
        </h1>
        <p className="max-w-prose text-sm text-stone">
          Actualiza los detalles de «{post.title}».
        </p>
      </header>

      <PostForm post={post} categories={categories} tags={tags} />
    </section>
  );
}