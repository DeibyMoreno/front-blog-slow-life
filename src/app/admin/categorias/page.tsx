import type { Metadata } from "next";

import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = {
  title: "Categorías",
  robots: { index: false, follow: false },
};

export default function AdminCategoriesPage() {
  return (
    <EmptyState
      title="Categorías"
      description="Organiza las historias por secciones del blog."
    />
  );
}