import type { Metadata } from "next";

import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = {
  title: "Artículos",
  robots: { index: false, follow: false },
};

export default function AdminArticlesPage() {
  return (
    <EmptyState
      title="Artículos"
      description="Crea, edita y publica las historias del blog desde un solo lugar."
    />
  );
}