import type { Metadata } from "next";

import { CategoriesManager } from "@/components/admin/categorias/categories-manager";
import { listCategories } from "@/lib/admin/api";

export const metadata: Metadata = {
  title: "Categorías",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <section className="space-y-8">
      <header className="space-y-1.5">
        <p className="text-xs font-medium tracking-widest text-sage uppercase">
          Panel · Slow Life
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink text-balance">
          Categorías
        </h1>
        <p className="max-w-prose text-sm text-stone">
          Organiza las historias por secciones del blog.
        </p>
      </header>

      <CategoriesManager categories={categories} />
    </section>
  );
}