import type { Metadata } from "next";

import { PostsManager } from "@/components/admin/articulos/posts-manager";
import { listPosts } from "@/lib/admin/api";

export const metadata: Metadata = {
  title: "Artículos",
  robots: { index: false, follow: false },
};

export default async function AdminArticlesPage() {
  const posts = await listPosts();

  return (
    <section className="space-y-8">
      <header className="space-y-1.5">
        <p className="text-xs font-medium tracking-widest text-sage uppercase">
          Panel · Slow Life
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink text-balance">
          Artículos
        </h1>
        <p className="max-w-prose text-sm text-stone">
          Crea, edita y publica las historias del blog desde un solo lugar.
        </p>
      </header>

      <PostsManager posts={posts} />
    </section>
  );
}