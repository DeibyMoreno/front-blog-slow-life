import type { Metadata } from "next";

import { TagsManager } from "@/components/admin/etiquetas/tags-manager";
import { listTags } from "@/lib/admin/api";

export const metadata: Metadata = {
  title: "Etiquetas",
  robots: { index: false, follow: false },
};

export default async function AdminTagsPage() {
  const tags = await listTags();

  return (
    <section className="space-y-8">
      <header className="space-y-1.5">
        <p className="text-xs font-medium tracking-widest text-sage uppercase">
          Panel · Slow Life
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink text-balance">
          Etiquetas
        </h1>
        <p className="max-w-prose text-sm text-stone">
          Conecta historias relacionadas entre sí.
        </p>
      </header>

      <TagsManager tags={tags} />
    </section>
  );
}