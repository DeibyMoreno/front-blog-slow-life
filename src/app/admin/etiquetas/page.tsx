import type { Metadata } from "next";

import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = {
  title: "Etiquetas",
  robots: { index: false, follow: false },
};

export default function AdminTagsPage() {
  return (
    <EmptyState
      title="Etiquetas"
      description="Conecta historias relacionadas entre sí."
    />
  );
}